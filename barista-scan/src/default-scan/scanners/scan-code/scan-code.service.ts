import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { ScannerBaseService } from '@app/default-scan/scanners/common/scanner-base.service';
import { License, LicenseScanResult, LicenseScanResultItem, Scan, SystemConfiguration } from '@app/models';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { LicenseService } from '@app/services/license/license.service';
import { ScanService } from '@app/services/scan/scan.service';
import { getFileContentsSync } from '@app/shared/util/get-file-contents-sync';
import { shellExecuteSync } from '@app/shared/util/shell-execute';
import { Injectable, Logger } from '@nestjs/common';
import * as execa from 'execa';
import { cloneDeep } from 'lodash';
import * as pit from 'p-iteration';
import { of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as tmp from 'tmp';

@Injectable()
export class ScanCodeService extends ScannerBaseService {
  constructor(
    private readonly scanService: ScanService,
    private readonly licenseService: LicenseService,
    private readonly licenseScanResultService: LicenseScanResultService,
    private readonly licenseScanResultItemService: LicenseScanResultItemService,
  ) {
    super();
  }
  private logger = new Logger('ScanCodeService');
  name = 'ScanCodeService';

  public async command(jobInfo: DefaultScanWorkerJobInfo) {
    return this.getCommand(jobInfo.tmpDir, jobInfo.dataDir);
  }

  async createLicense(rawLicense: any): Promise<License> {
    const newLicense: Partial<License> = {
      name: rawLicense.short_name,
      code: rawLicense.key,
      desc: rawLicense.name,
      textUrl: rawLicense.text_url,
      homepageUrl: rawLicense.homepage_url,
      referenceUrl: rawLicense.reference_url,
    };

    return this.licenseService.db.save(newLicense as License);
  }

  async extractLicenseInformation(json: any) {
    return new Promise<any>((resolve, reject) => {
      const fileKey = 'files';

      of(json[fileKey])
        .pipe(
          first(),
          map((items: any[]) => {
            return items
              .map((item: any) => {
                if (item.licenses) {
                  // Let's invert the license/file so that each license will have a reference to it's file
                  // so we can report it later
                  item.licenses.forEach(license => {
                    const file = cloneDeep(item);
                    delete file.licenses;
                    license.file = file;
                  });
                }
                return item.licenses;
              })
              .reduce((previousValue: any[], currentValue: any[], currentIndex: number, array: any[]) => {
                if (currentValue.length > 0) {
                  const result = [...previousValue, ...currentValue];
                  return result;
                } else {
                  return [...previousValue];
                }
              });
          }),
        )
        .subscribe(
          result => {
            resolve(result);
          },
          error => {
            reject(error);
          },
        );
    });
  }

  public async getCommand(targetDir: string, dataDir: string) {
    const config = await SystemConfiguration.defaultConfiguration();
    // tslint:disable-next-line:max-line-length
    const command = `${ScanCodeService.toolsDir}/scancode-toolkit/scancode -l --strip-root --max-in-memory 100000 -n ${config.maxProcesses} --verbose --timing --json ${dataDir}/scancode-results.json ${targetDir}`;
    return command;
  }

  public getResults(dataDir) {
    const jsonFile = `${dataDir}/scancode-results.json`;
    let json = null;
    json = getFileContentsSync(jsonFile);
    return JSON.parse(json);
  }

  public options(jobInfo: DefaultScanWorkerJobInfo): execa.Options {
    return {
      env: {
        OBJC_DISABLE_INITIALIZE_FORK_SAFETY: 'YES',
      },
    };
  }

  public async postExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return new Promise<DefaultScanWorkerJobInfo>(async (resolve, reject) => {
      try {
        const json = this.getResults(jobInfo.dataDir);

        // Update scan object with a scan result object here...
        const scan: Scan = await this.scanService.findOne(jobInfo.scanId);

        const rawLicenseScan = {
          jsonResults: json,
          scanTool: 'scan-code',
          startedAt: this.startedAt,
          completedAt: new Date(),
          scan,
        };

        const licenseScanResult = await this.licenseScanResultService.insertResult(rawLicenseScan, scan);

        scan.jobInfo.data = jobInfo;

        await this.postProcess(licenseScanResult);

        licenseScanResult.completedAt = new Date();
        await licenseScanResult.save();

        resolve(jobInfo);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async postProcess(licenseScanResult: LicenseScanResult): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      // Extract licenses
      const rawLicenses = await this.extractLicenseInformation(licenseScanResult.jsonResults);

      await pit.forEachSeries(rawLicenses, async (item: any) => {
        const license = await this.upsertLicense(item);

        // For each license create a LicenseScanResultItem Object
        // Associate the LicenseScanResultItem with this.LicenseScanResult
        const licenseScanResultItem: Partial<LicenseScanResultItem> = {
          license,
          licenseScan: licenseScanResult,
          rawResults: item,
          displayIdentifier: item.file.path,
          path: item.file.path,
        };

        await this.licenseScanResultItemService.insertResultItem(licenseScanResultItem, license, licenseScanResult);
      });

      resolve();
    });
  }

  public async preExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return Promise.resolve(jobInfo);
  }

  public async scanDir(targetDir: string) {
    const config = await SystemConfiguration.defaultConfiguration();
    const dataDir = tmp.dirSync();
    // tslint:disable-next-line:max-line-length
    const command = `${ScanCodeService.toolsDir}/scancode-toolkit/scancode -l --strip-root --max-in-memory 100000 -n ${config.maxProcesses} --verbose --timing --json ${dataDir.name}/scancode-results.json ${targetDir}`;

    shellExecuteSync(command, {
      shell: true,
      env: {
        OBJC_DISABLE_INITIALIZE_FORK_SAFETY: 'YES',
      },
    });

    return this.getResults(dataDir.name);
  }

  async upsertLicense(rawLicense: any): Promise<License> {
    return new Promise<License>(async (resolve, reject) => {
      // Check if there is an existing license using the key
      const license = await License.findOne({
        where: { code: rawLicense.key },
      });

      if (license) {
        // If exists return it
        resolve(license);
      } else {
        // If not, create one
        const newLicense = await this.createLicense(rawLicense);
        resolve(newLicense);
      }
    });
  }
}
