import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { ScannerBaseService } from '@app/default-scan/scanners/common/scanner-base.service';
import { ScanCodeService } from '@app/default-scan/scanners/scan-code/scan-code.service';
import { LicenseScanResult, LicenseScanResultItem, Scan, SystemConfiguration } from '@app/models';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { LicenseService } from '@app/services/license/license.service';
import { ScanService } from '@app/services/scan/scan.service';
import { convertXmlFileToJsonObject } from '@app/shared/util/convert-xml-to-json-object';
import { getDirFiles } from '@app/shared/util/get-dir-files';
import { Injectable, Logger } from '@nestjs/common';
import * as execa from 'execa';
import * as find from 'find';
import * as fs from 'fs';
import * as htmlToText from 'html-to-text';
import * as _ from 'lodash';
import * as pAll from 'p-all';
import * as pit from 'p-iteration';
import * as path from 'path';
import * as rp from 'request-promise';
import * as shelljs from 'shelljs';
import * as tmp from 'tmp';

@Injectable()
export class LicenseNugetService extends ScannerBaseService {
  constructor(
    private readonly scanService: ScanService,
    private readonly scanCodeService: ScanCodeService,
    private readonly licenseService: LicenseService,
    private readonly licenseScanResultService: LicenseScanResultService,
    private readonly licenseScanResultItemService: LicenseScanResultItemService,
  ) {
    super();
  }
  private logger = new Logger('LicenseNugetService');
  name = 'LicenseNugetService';

  public async command(jobInfo: DefaultScanWorkerJobInfo) {
    return null;
  }

  public async fetchLicense(nuspec: any) {
    let licenseText = null;
    const url = nuspec.licenseUrl;

    if (nuspec && !_.isEmpty(url)) {
      this.logger.log(`fetchLicense() found a licenseUrl [${url}] for nuspec: ${nuspec.id}`);
      const file = tmp.tmpNameSync({
        prefix: 'license-',
        postfix: '.txt',
        dir: nuspec.dir,
      });
      this.logger.log(`fetchLicense() generated tmp filename: ${file}`);

      const BARISTA_OSS_USERNAME = process.env.BARISTA_OSS_USERNAME;
      const BARISTA_OSS_PASSWORD = process.env.BARISTA_OSS_PASSWORD;
      const HTTPS_PROXY_SERVER = process.env.HTTPS_PROXY_SERVER;
      const HTTPS_PROXY_PORT = process.env.HTTPS_PROXY_PORT;

      let requestFn = () => {
        this.logger.log('--- NOT Adding proxy information to the NVD fetch.');
        return rp(url);
      };

      this.logger.log(`BARISTA_OSS_USERNAME:${!_.isEmpty(BARISTA_OSS_USERNAME)}\n \
      BARISTA_OSS_PASSWORD:${!_.isEmpty(BARISTA_OSS_PASSWORD)}\n \
      HTTPS_PROXY_SERVER: ${HTTPS_PROXY_SERVER}\n \
      HTTPS_PROXY_PORT: ${HTTPS_PROXY_PORT}`);

      if (BARISTA_OSS_USERNAME && BARISTA_OSS_PASSWORD && HTTPS_PROXY_SERVER && HTTPS_PROXY_PORT) {
        const proxy = `http://${BARISTA_OSS_USERNAME}:${BARISTA_OSS_PASSWORD}@${HTTPS_PROXY_SERVER}:${HTTPS_PROXY_PORT}`;

        requestFn = () => {
          this.logger.log('+++ Adding proxy information to the NVD fetch.');
          return rp({
            url,
            proxy,
          });
        };
      }

      const response: any = await requestFn().catch(error => {
        this.logger.error(`fetchLicense() error: ${error}`);
      });

      if (response && !_.isEmpty(response.data)) {
        licenseText = htmlToText.fromString(response.data);

        this.logger.log(`fetchLicense() writing file...`);
        fs.writeFileSync(file, licenseText);
      } else {
        this.logger.error(`fetchLicense() response.data was empty!`);
      }
    }

    return licenseText;
  }

  public getPackageName(nuspec: any) {
    return `${nuspec.id}@${nuspec.version}`;
  }

  public getPackageSpecFilenames(rootDir: string) {
    const filenames = find.fileSync(/\.nuspec$/, rootDir);

    return filenames;
  }

  public async getPackageSpecJson(filenames: string[]) {
    const specs = [];

    await pit.forEachSeries(filenames, async (file: string) => {
      try {
        const json = await convertXmlFileToJsonObject(file);
        if (!_.isEmpty(json.package.metadata)) {
          const spec = json.package.metadata;
          spec.dir = path.dirname(file);
          specs.push(spec);
        }
      } catch (e) {
        this.logger.error(`getPackageSpecJson() error: ${e}`);
      }
    });

    return specs;
  }

  public options(jobInfo: DefaultScanWorkerJobInfo): execa.Options {
    return {
      cwd: jobInfo.tmpDir,
    };
  }

  public async postExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return new Promise<DefaultScanWorkerJobInfo>(async (resolve, reject) => {
      try {
        // Get all nNuSpecs from the file system
        const filenames = await this.getPackageSpecFilenames(path.join(jobInfo.tmpDir, 'dependencies'));
        // Convert each into json
        const nuspecs = await this.getPackageSpecJson(filenames);

        // Update scan object with a scan result object here...
        const scan: Scan = await this.scanService.findOne(jobInfo.scanId);

        const rawLicenseScan = {
          jsonResults: nuspecs,
          scanTool: 'license-nuget',
          startedAt: this.startedAt,
          scan,
        };

        const licenseScanResult = await this.licenseScanResultService.insertResult(rawLicenseScan, scan);

        scan.jobInfo.data = jobInfo;
        await scan.save();

        await this.postProcess(licenseScanResult, nuspecs);

        licenseScanResult.completedAt = new Date();
        await this.licenseScanResultService.db.save(licenseScanResult);

        resolve(jobInfo);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async postProcess(licenseScanResult: LicenseScanResult, nuspecs: any[]): Promise<void> {
    return new Promise<void>(async resolve => {
      const operations = [];

      nuspecs.forEach(nuspec => {
        const operation = async () => {
          try {
            const packageName = this.getPackageName(nuspec);

            await this.fetchLicense(nuspec);
            const rawScanCodeResult = await this.scanForLicenses(nuspec);
            const scanCodeOutput = await this.scanCodeService.extractLicenseInformation(rawScanCodeResult);

            return {
              scanCodeOutput,
              packageName,
              nuspec,
            };
          } catch (e) {
            this.logger.debug(`postProcess:Operation error: ${JSON.stringify(e)}`);
          }
        };

        operations.push(operation);
      });

      const config = await SystemConfiguration.defaultConfiguration();
      const results = await pAll(operations, { concurrency: config.maxProcesses });

      await pit.forEachSeries(results, async (result: any) => {
        if (result.scanCodeOutput && result.packageName) {
          const uniqueLicenseOutput = _.uniqBy(result.scanCodeOutput, 'key');

          await pit.forEachSeries(uniqueLicenseOutput, async (item: any) => {
            try {
              const license = await this.scanCodeService.upsertLicense(item);

              // For each license create a LicenseScanResultItem Object
              // Associate the LicenseScanResultItem with this.LicenseScanResult
              const licenseScanResultItem: Partial<LicenseScanResultItem> = {
                rawResults: item,
                displayIdentifier: result.packageName,
                path: result.packageName,
                publisherName: result.nuspec.owners,
                publisherUrl: result.nuspec.projectUrl,
              };

              await this.licenseScanResultItemService.insertResultItem(
                licenseScanResultItem,
                license,
                licenseScanResult,
              );
            } catch (e) {
              this.logger.debug(`postProcess:uniqueLicenseOutput error: ${JSON.stringify(e)}`);
            }
          });
        } else {
          this.logger.error(
            `postProcess:result contained no scanCodeOutput && packageName, instead: ${JSON.stringify(
              result,
              null,
              2,
            )}`,
          );
        }
      });

      resolve();
    });
  }

  public async preExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return Promise.resolve(jobInfo);
  }

  public async scanForLicenses(nuspec: any) {
    const tmpDir = tmp.dirSync();

    // Get Files
    const files = getDirFiles(`${nuspec.dir}/`);

    // Copy Files
    files.forEach(file => {
      if (file) {
        try {
          shelljs.cp(file, tmpDir.name);
        } catch (e) {
          this.logger.error(`scanForLicenses() ${nuspec.id} error: ${e}`);
        }
      }
    });

    const scanResults = await this.scanCodeService.scanDir(tmpDir.name);
    return scanResults;
  }
}
