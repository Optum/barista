import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { ScannerBaseService } from '@app/default-scan/scanners/common/scanner-base.service';
import { License, LicenseScanResult, LicenseScanResultItem, Scan } from '@app/models';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { LicenseService } from '@app/services/license/license.service';
import { ScanService } from '@app/services/scan/scan.service';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as pit from 'p-iteration';
import * as path from 'path';

@Injectable()
export class LicenseCheckerService extends ScannerBaseService {
  constructor(
    private readonly scanService: ScanService,
    private readonly licenseService: LicenseService,
    private readonly licenseScanResultService: LicenseScanResultService,
    private readonly licenseScanResultItemService: LicenseScanResultItemService,
  ) {
    super();
  }
  private logger = new Logger('LicenseCheckerService');
  name = 'LicenseCheckerService';

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
    const command = `node ${this.toolsDir}/license-checker/node_modules/license-checker/bin/license-checker --json --out ${jobInfo.dataDir}/license-checker-results.json --start ${targetDir}`;
    return command;
  }

  public async licenseScanResultItemFromJson(key: string, value: any) {
    const result: LicenseScanResultItem = new LicenseScanResultItem();
    result.displayIdentifier = key;
    result.path = value.path;
    result.rawResults = value;
    result.publisherName = value.publisher;
    result.publisherEmail = value.email;
    result.publisherUrl = value.repository;

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
        const jsonFile = `${jobInfo.dataDir}/license-checker-results.json`;
        let json = null;
        if (fs.existsSync(jsonFile)) {
          json = fs.readFileSync(jsonFile, 'utf8');
        }

        // Update scan object with a scan result object here...
        const scan: Scan = await this.scanService.findOne(jobInfo.scanId);

        const rawLicenseScan = {
          jsonResults: JSON.parse(json),
          scanTool: 'license-checker',
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
    const keys = Object.keys(licenseScanResult.jsonResults);

    // For each library returned
    await pit.forEachSeries(keys, async (key: string) => {
      try {
        if (key) {
          // Extract license
          const value = licenseScanResult.jsonResults[key];

          this.logger.log(`license: ${JSON.stringify(value, null, 4)}`);

          if (_.isString(value.licenses)) {
            await this.upsertLicense(key, value, value.licenses, licenseScanResult);
          } else if (_.isArray(value.licenses)) {
            // There are some instances where licenses may be reported in an array, in this case we need to iterate them

            await pit.forEachSeries(value.licenses, async (item: string) => {
              await this.upsertLicense(key, value, item, licenseScanResult);
            });
          } else {
            this.logger.error(
              `value.licenses was not a string or an array! it was ${value.licenses}\n stringified:\n${JSON.stringify(
                value.licenses,
                null,
                4,
              )}`,
            );
          }
        } else {
          this.logger.error(
            `postProcess[${JSON.stringify(licenseScanResult, null, 4)}]: A key was not found in: ${keys}`,
          );
        }
      } catch (e) {
        this.logger.error(`postProcess[${JSON.stringify(licenseScanResult, null, 4)}]: ${e}`);
      }
    });

    return;
  }

  public async preExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return Promise.resolve(jobInfo);
  }

  public async upsertLicense(key: string, value: any, licenseString: string, licenseScanResult: LicenseScanResult) {
    const licenseScanResultItem = await this.licenseScanResultItemFromJson(key, value);
    // Upsert license
    const partialLicense = this.partialLicense(licenseString);

    const license = await this.licenseService.upsertLicense(licenseString, partialLicense);

    await this.licenseScanResultItemService.insertResultItem(licenseScanResultItem, license, licenseScanResult);

    return license;
  }
}
