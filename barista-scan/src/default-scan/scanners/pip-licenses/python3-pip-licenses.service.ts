import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { ScannerBaseService } from '@app/default-scan/scanners/common/scanner-base.service';
import { License, LicenseScanResult, LicenseScanResultItem, Scan } from '@app/models';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { LicenseService } from '@app/services/license/license.service';
import { ScanService } from '@app/services/scan/scan.service';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as pit from 'p-iteration';
import * as path from 'path';

@Injectable()
export class Python3PipLicensesService extends ScannerBaseService {
  constructor(
    private readonly scanService: ScanService,
    private readonly licenseService: LicenseService,
    private readonly licenseScanResultService: LicenseScanResultService,
    private readonly licenseScanResultItemService: LicenseScanResultItemService,
  ) {
    super();
  }
  private logger = new Logger('Python3PipLicensesService');
  name = 'Python3PipLicensesService';

  public async command(jobInfo: DefaultScanWorkerJobInfo) {
    // Create the Scan with that project
    const scan: Scan = await this.scanService.db
      .createQueryBuilder('scan')
      .leftJoinAndSelect('scan.project', 'project')
      .whereInIds(jobInfo.scanId)
      .getOne();

    let targetDir = jobInfo.tmpDir;
    if (scan.project.customPackageManagerPath) {
      targetDir = path.join(jobInfo.tmpDir, scan.project.customPackageManagerPath);
    }

    // tslint:disable-next-line:max-line-length
    const command = `cd ${targetDir}  && source env/bin/activate && python3 ${this.toolsDir}/pip-licenses/piplicenses.py --format=json -u -d -l > ${jobInfo.dataDir}/pip-licenses-results.json && deactivate`;

    return command;
  }

  public async licenseScanResultItemFromJson(value: any) {
    const result: LicenseScanResultItem = new LicenseScanResultItem();
    result.description = value.Description;
    result.displayIdentifier = value.Name;
    result.path = value.Name;
    result.rawResults = value;
    result.publisherName = value.Name;
    result.publisherUrl = value.URL;
    return result;
  }

  public partialLicense(licenseKey: string): Partial<License> {
    return {
      name: licenseKey,
      code: licenseKey,
    } as Partial<License>;
  }

  public async postExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return new Promise<DefaultScanWorkerJobInfo>(async (resolve, reject) => {
      try {
        const jsonFile = `${jobInfo.dataDir}/pip-licenses-results.json`;
        let json = null;
        if (fs.existsSync(jsonFile)) {
          json = fs.readFileSync(jsonFile, 'utf8');
        }

        // Update scan object with a scan result object here...
        const scan: Scan = await this.scanService.findOne(jobInfo.scanId);

        const rawLicenseScan = {
          jsonResults: JSON.parse(json),
          scanTool: 'pythin3-pip-licenses',
          startedAt: this.startedAt,
          completedAt: this.completedAt,
        };

        const licenseScanResult = await this.licenseScanResultService.insertResult(rawLicenseScan, scan);

        scan.jobInfo.data = jobInfo;
        await scan.save();

        await this.postProcess(licenseScanResult);

        licenseScanResult.completedAt = new Date();
        await this.licenseScanResultService.db.save(licenseScanResult);

        resolve(jobInfo);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async postProcess(licenseScanResult: LicenseScanResult): Promise<void> {
    // For each library returned
    await pit.forEachSeries(licenseScanResult.jsonResults, async (key: any) => {
      try {
        await this.upsertLicense(key, key.License, licenseScanResult);
      } catch (e) {
        this.logger.error(`postProcess[${JSON.stringify(licenseScanResult, null, 4)}]: ${e}`);
      }
    });

    return;
  }

  public async preExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return Promise.resolve(jobInfo);
  }

  public async upsertLicense(value: any, licenseString: string, licenseScanResult: LicenseScanResult) {
    const licenseScanResultItem = await this.licenseScanResultItemFromJson(value);
    // Upsert license
    const partialLicense = this.partialLicense(licenseString);

    const license = await this.licenseService.upsertLicense(licenseString, partialLicense);

    await this.licenseScanResultItemService.insertResultItem(licenseScanResultItem, license, licenseScanResult);

    return license;
  }
}
