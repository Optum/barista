import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { ScannerBaseService } from '@app/default-scan/scanners/common/scanner-base.service';
import { License, LicenseScanResult, LicenseScanResultItem, Scan } from '@app/models';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { LicenseService } from '@app/services/license/license.service';
import { ScanService } from '@app/services/scan/scan.service';
import { Injectable, Logger } from '@nestjs/common';
import parse = require('csv-parse/lib/sync');
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GoLicensesService extends ScannerBaseService {
  constructor(
    private readonly scanService: ScanService,
    private readonly licenseService: LicenseService,
    private readonly licenseScanResultService: LicenseScanResultService,
    private readonly licenseScanResultItemService: LicenseScanResultItemService,
  ) {
    super();
  }
  private logger = new Logger('GoLicensesService');
  name = 'GoLicensesService';

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

    const binary = 'go-licenses';

    // tslint:disable-next-line:max-line-length
    const command = `cd ${targetDir}; GOPATH=${targetDir}/.go ${binary} report ./ > ${jobInfo.dataDir}/go-licenses.csv 2> ${jobInfo.dataDir}/errors`;
    return command;
  }

  public convertCsvResultsToJson(csvText: string) {
    let arr = csvText.split('\n');
    arr = arr.filter(function (item) {
      return item.indexOf('E0') !== 0;
    });

    arr = arr.filter(function (item) {
      return item.indexOf('E11') !== 0;
    });

    arr = arr.filter(function (item) {
      return item.indexOf('W11') !== 0;
    });

    arr = arr.filter(function (item) {
      return item.indexOf('-') !== 0;
    });

    arr = arr.filter(function (item) {
      return item.indexOf('/') !== 0;
    });

    csvText = arr.join('\n');
    this.logger.debug(csvText);
    const json = parse(csvText, {
      // columns: true,
      skip_empty_lines: true,
      delimiter: ',',
      trim: true,
      skip_lines_with_error: true,
      quote: false,
    });

    return json;
  }

  public async licenseScanResultItemFromJson(value: any) {
    const result: LicenseScanResultItem = new LicenseScanResultItem();
    result.displayIdentifier = value[0];
    result.path = value[0];
    result.rawResults = value;
    // result.publisherName = value[0];
    result.publisherUrl = value[0];

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
        const csvFile = `${jobInfo.dataDir}/go-licenses.csv`;

        let csvText = null;
        if (fs.existsSync(csvFile)) {
          csvText = fs.readFileSync(csvFile, 'utf8');
        } else {
          reject(new Error(`${jobInfo.dataDir}/go-licenses.csv not found!`));
          return;
        }

        const json = this.convertCsvResultsToJson(csvText);

        // Update scan object with a scan result object here...
        const scan: Scan = await this.scanService.findOne(jobInfo.scanId);

        const rawLicenseScan = {
          jsonResults: json,
          scanTool: 'go-licenses',
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
    // Iterate all results
    // For each result create a LicenseScanResultItem
    // Object at index[0] is the name of the library
    // Object at index[2] is the license SPDX code

    const rawResults = licenseScanResult.jsonResults as string[][];

    while (rawResults.length > 0) {
      const rawResult = rawResults.shift(); // ["Library Name", "Licenses Location", "SPDX License Code"]

      await this.upsertLicense(rawResult, licenseScanResult);
    }

    return;
  }

  public async preExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return Promise.resolve(jobInfo);
  }

  public async upsertLicense(value: any, licenseScanResult: LicenseScanResult) {
    const licenseScanResultItem = await this.licenseScanResultItemFromJson(value);
    // Upsert license
    const partialLicense = this.partialLicense(value[2]);

    const license = await this.licenseService.upsertLicense(value[2], partialLicense);

    await this.licenseScanResultItemService.insertResultItem(licenseScanResultItem, license, licenseScanResult);

    return license;
  }
}
