// tslint:disable:max-line-length
import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { ScannerBaseService } from '@app/default-scan/scanners/common/scanner-base.service';
import { Scan, SecurityScanResultItem } from '@app/models';
import { ScanService } from '@app/services/scan/scan.service';
import { SecurityScanResultItemStatusTypeService } from '@app/services/security-scan-result-item-status-type/security-scan-result-item-status-type.service';
import { SecurityScanResultItemService } from '@app/services/security-scan-result-item/security-scan-result-item.service';
import { SecurityScanResultService } from '@app/services/security-scan-result/security-scan-result.service';
import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import * as pit from 'p-iteration';
import * as rp from 'request-promise';

// tslint:enable:max-line-length

@Injectable()
export class NvdCheckService extends ScannerBaseService {
  constructor(
    private readonly scanService: ScanService,
    private readonly securityScanResultService: SecurityScanResultService,
    private readonly securityScanResultItemService: SecurityScanResultItemService,
  ) {
    super();
  }
  private readonly logger = new Logger('NvdCheckService');
  name = 'NvdCheckService';

  public async command(jobInfo: DefaultScanWorkerJobInfo) {
    return null;
  }

  async fetchNvdPage(productName: string, productVersion: string) {
    // tslint:disable-next-line:max-line-length
    const url = `https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=${productName}+${productVersion}&search_type=all`;

    const BARISTA_OSS_USERNAME = process.env.BARISTA_OSS_USERNAME;
    const BARISTA_OSS_PASSWORD = process.env.BARISTA_OSS_PASSWORD;
    const HTTPS_PROXY_SERVER = process.env.HTTPS_PROXY_SERVER;
    const HTTPS_PROXY_PORT = process.env.HTTPS_PROXY_PORT;

    this.logger.log(`BARISTA_OSS_USERNAME:${!_.isEmpty(BARISTA_OSS_USERNAME)}\n \
    BARISTA_OSS_PASSWORD:${!_.isEmpty(BARISTA_OSS_PASSWORD)}\n \
    HTTPS_PROXY_SERVER: ${HTTPS_PROXY_SERVER}\n \
    HTTPS_PROXY_PORT: ${HTTPS_PROXY_PORT}`);

    if (BARISTA_OSS_USERNAME && BARISTA_OSS_PASSWORD && HTTPS_PROXY_SERVER && HTTPS_PROXY_PORT) {
      this.logger.log('+++ Adding proxy information to the NVD fetch.');

      const proxy = `http://${BARISTA_OSS_USERNAME}:${BARISTA_OSS_PASSWORD}@${HTTPS_PROXY_SERVER}:${HTTPS_PROXY_PORT}`;

      return rp({
        url,
        proxy,
      });
    } else {
      this.logger.log('--- NOT Adding proxy information to the NVD fetch.');
      return rp(url);
    }
  }

  async getStatusTypeForSeverity(severity: string) {
    let status = await SecurityScanResultItemStatusTypeService.Unknown();

    if (!severity) {
      return status;
    }

    if (severity.toLowerCase().indexOf('low') > -1) {
      status = await SecurityScanResultItemStatusTypeService.Low();
    } else if (severity.toLowerCase().indexOf('moderate') > -1) {
      status = await SecurityScanResultItemStatusTypeService.Medium();
    } else if (severity.toLowerCase().indexOf('medium') > -1) {
      status = await SecurityScanResultItemStatusTypeService.Medium();
    } else if (severity.toLowerCase().indexOf('high') > -1) {
      status = await SecurityScanResultItemStatusTypeService.High();
    } else if (severity.toLowerCase().indexOf('critical') > -1) {
      status = await SecurityScanResultItemStatusTypeService.High();
    } else {
      status = await SecurityScanResultItemStatusTypeService.Unknown();
    }

    return status;
  }

  async nvdLookup(dependency: string, version: string) {
    let success = false;
    let error = null;
    let count = 0;
    let securityResults = [];

    try {
      const html = await this.fetchNvdPage(dependency, version).catch(e => {
        throw e;
      });

      securityResults = await this.parseCveResultTable(dependency, html);

      count = securityResults.length;

      success = true;
    } catch (e) {
      this.logger.error(`nvdLookup(): ${e}`);
      error = e;
    }

    return {
      success,
      error,
      count,
      securityResults,
    };
  }

  async parseCveResultTable(productName: string, html: string): Promise<Array<Partial<SecurityScanResultItem>>> {
    const resultItems: Array<Partial<SecurityScanResultItem>> = [];

    const $ = cheerio.load(html);

    $('[data-testid="vuln-results-table"]')
      .find('tr')
      .each((tri, tr) => {
        if (tri !== 0) {
          const result: Partial<SecurityScanResultItem> = {};

          result.path = productName;

          // First th = CVE ID
          result.displayIdentifier = result.cveId = $(tr)
            .find('a')
            .first()
            .text();
          result.referenceUrl = `https://nvd.nist.gov/vuln/detail/${result.cveId}`;

          $(tr)
            .find('td')
            .each(async (tdi, td) => {
              switch (tdi) {
                case 0: {
                  // First td = CVE Description
                  result.description = $(td)
                    .find('p')
                    .text();
                }
                case 1: {
                  // Second td:
                  //  - First span v3 Severity, 1st A
                  //  - Second span v2 Severity, 1st A
                  const severity = $(td)
                    .find('a')
                    .first()
                    .text();

                  result.severity = (await this.getStatusTypeForSeverity(severity)).code;
                }
              }
            });

          resultItems.push(result);
        }
      });

    return resultItems;
  }

  public async postExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return new Promise<DefaultScanWorkerJobInfo>(async (resolve, reject) => {
      try {
        // Update scan object with a scan result object here...
        const scan: Scan = await this.scanService.db
          .createQueryBuilder('scan')
          .leftJoinAndSelect('scan.project', 'project')
          .leftJoinAndSelect('scan.deploymentType', 'deploymentType')
          .whereInIds(jobInfo.scanId)
          .getOne();

        // TODO: Perform the screen scrape
        const result = await this.nvdLookup(scan.project.name.trim(), scan.project.currentVersion.trim());

        if (result.success) {
          this.logger.log(`Result from the NVD: ${JSON.stringify(result, null, 2)}`);

          const rawScanResult = {
            jsonResults: {},
            htmlResults: '',
            scanTool: 'nvd-check',
            startedAt: this.startedAt,
            completedAt: this.completedAt,
          };

          const securityScanResult = await this.securityScanResultService.insertResult(rawScanResult, scan);

          await pit.forEachSeries(result.securityResults, async securityItem => {
            await this.securityScanResultItemService.insertResultItem(
              securityItem,
              await this.getStatusTypeForSeverity(securityItem.severity),
              securityScanResult,
            );
          });

          securityScanResult.completedAt = new Date();
          await securityScanResult.save();
        } else {
          this.logger.error(
            `There was an error retrieving NVD results for project: ${scan.project.name} v${scan.project.currentVersion}`,
          );
          this.logger.error(`Result from the NVD: ${JSON.stringify(result, null, 2)}`);
        }

        resolve(jobInfo);
      } catch (error) {
        reject(error);
      }
    });
  }

  public preExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return Promise.resolve(jobInfo);
  }
}
