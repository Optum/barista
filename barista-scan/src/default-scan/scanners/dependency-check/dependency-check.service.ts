// tslint:disable:max-line-length
import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { ScannerBaseService } from '@app/default-scan/scanners/common/scanner-base.service';
import { Scan, SecurityScanResult, SecurityScanResultItem } from '@app/models';
import { ScanService } from '@app/services/scan/scan.service';
import { SecurityScanResultItemStatusTypeService } from '@app/services/security-scan-result-item-status-type/security-scan-result-item-status-type.service';
import { SecurityScanResultItemService } from '@app/services/security-scan-result-item/security-scan-result-item.service';
import { SecurityScanResultService } from '@app/services/security-scan-result/security-scan-result.service';
import { jsonSafeParse } from '@app/shared/util/json-safe-parse/json-safe-parse';
import { shellExecuteSync } from '@app/shared/util/shell-execute';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as pit from 'p-iteration';
// tslint:enable:max-line-length

@Injectable()
export class DependencyCheckService extends ScannerBaseService {
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
    let command = `${this.toolsDir}/dependency-check/bin/dependency-check.sh --project \
    ${jobInfo.projectName} --out ${jobInfo.dataDir}/dependency-check/ \
    --format ALL --scan ${jobInfo.tmpDir}`;

    const BARISTA_OSS_USERNAME = process.env.BARISTA_OSS_USERNAME;
    const BARISTA_OSS_PASSWORD = process.env.BARISTA_OSS_PASSWORD;
    const HTTPS_PROXY_SERVER = process.env.HTTPS_PROXY_SERVER;
    const HTTPS_PROXY_PORT = process.env.HTTPS_PROXY_PORT;

    this.logger.log(`BARISTA_OSS_USERNAME:${!_.isEmpty(BARISTA_OSS_USERNAME)}\n \
    BARISTA_OSS_PASSWORD:${!_.isEmpty(BARISTA_OSS_PASSWORD)}\n \
    HTTPS_PROXY_SERVER: ${HTTPS_PROXY_SERVER}\n \
    HTTPS_PROXY_PORT: ${HTTPS_PROXY_PORT}`);

    if (BARISTA_OSS_USERNAME && BARISTA_OSS_PASSWORD && HTTPS_PROXY_SERVER && HTTPS_PROXY_PORT) {
      this.logger.log('+++ Adding proxy information to the dependency-check command line.');

      command = `${command} \
      --proxyuser $BARISTA_OSS_USERNAME \
      --proxypass $BARISTA_OSS_PASSWORD \
      --proxyserver $HTTPS_PROXY_SERVER \
      --proxyport $HTTPS_PROXY_PORT`;
    } else {
      this.logger.log('--- NOT Adding proxy information to the dependency-check command line.');
    }

    return command;
  }

  public createSecurityScanResultItem(packageName: string, vulnerability: any): Partial<SecurityScanResultItem> {
    const item: Partial<SecurityScanResultItem> = {};
    item.itemType = 'vulnerability';
    item.displayIdentifier = vulnerability.name;
    item.cveId = vulnerability.name;
    item.description = vulnerability.description;
    item.path = packageName;
    item.severity = vulnerability.severity;
    item.rawResults = vulnerability;

    if (!_.isEmpty(vulnerability.references)) {
      item.referenceUrl = vulnerability.references[0].url;
    }

    return item;
  }

  public getPackageName(dependency: any, tmpDir: string): string {
    let packageName: string = dependency.filePath.replace(`${tmpDir}/`, '');

    if (dependency.packages && dependency.packages.length > 0) {
      packageName = dependency.packages[0].id;
    }

    return packageName;
  }

  async getStatusTypeForSeverity(severity: string) {
    let status = await SecurityScanResultItemStatusTypeService.Unknown();

    if (!severity) {
      return status;
    }

    switch (severity.toLowerCase()) {
      case 'moderate': {
        status = await SecurityScanResultItemStatusTypeService.Medium();
        break;
      }

      case 'medium': {
        status = await SecurityScanResultItemStatusTypeService.Medium();
        break;
      }

      case 'high': {
        status = await SecurityScanResultItemStatusTypeService.High();
        break;
      }

      case 'critical': {
        status = await SecurityScanResultItemStatusTypeService.High();
        break;
      }

      default: {
        status = await SecurityScanResultItemStatusTypeService.Unknown();
        break;
      }
    }

    return status;
  }

  public getVulnerableDependencies(dependencies: any[]): any[] {
    const vulnerables = _.filter(dependencies, (item: any) => {
      if (item.vulnerabilities && item.vulnerabilities.length > 0) {
        return item;
      }
    });

    return vulnerables;
  }

  public async postExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return new Promise<DefaultScanWorkerJobInfo>(async (resolve, reject) => {
      try {
        const htmlFile = `${jobInfo.dataDir}/dependency-check/dependency-check-report.html`;
        let html = null;
        if (fs.existsSync(htmlFile)) {
          html = fs.readFileSync(htmlFile, 'utf8');
        } else {
          this.logger.error(`dependency-check HTML Report not found! : ${htmlFile}`);
          shellExecuteSync(`ls -la ${jobInfo.dataDir}`);
          shellExecuteSync(`ls -la ${jobInfo.dataDir}/dependency-check/`);
        }

        const jsonFile = `${jobInfo.dataDir}/dependency-check/dependency-check-report.json`;
        let json = null;

        if (fs.existsSync(jsonFile)) {
          json = fs.readFileSync(jsonFile, 'utf8');
        } else {
          this.logger.error(`dependency-check JSON Report not found! : ${jsonFile}`);
          shellExecuteSync(`ls -la ${jobInfo.dataDir}`);
          shellExecuteSync(`ls -la ${jobInfo.dataDir}/dependency-check/`);
        }

        // Update scan object with a scan result object here...
        const scan: Scan = await this.scanService.findOne(jobInfo.scanId);

        // const parsedJson = JSON.parse(json);
        const parsedJson = jsonSafeParse(json);

        const rawScanResult = {
          jsonResults: parsedJson,
          htmlResults: html,
          scanTool: 'dependency-check',
          startedAt: this.startedAt,
          completedAt: this.completedAt,
        };

        const securityScanResult = await this.securityScanResultService.insertResult(rawScanResult, scan);

        await this.postProcess(securityScanResult, jobInfo).catch(error => {
          this.logger.error(error, null, 'postProcess');
        });

        securityScanResult.completedAt = new Date();
        await securityScanResult.save();

        resolve(jobInfo);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async postProcess(securityScanResult: SecurityScanResult, jobInfo: DefaultScanWorkerJobInfo): Promise<void> {
    const dependencies = this.getVulnerableDependencies(securityScanResult.jsonResults.dependencies);

    // For each library returned
    await pit.forEach(dependencies, async (dependency: any) => {
      const packageName = this.getPackageName(dependency, jobInfo.tmpDir);

      await pit.forEach(dependency.vulnerabilities, async (vulnerability: any) => {
        try {
          const securityScanResultItem = this.createSecurityScanResultItem(packageName, vulnerability);

          const status = await this.getStatusTypeForSeverity(securityScanResultItem.severity);

          await this.securityScanResultItemService.insertResultItem(securityScanResultItem, status, securityScanResult);
        } catch (e) {
          this.logger.error(e, null, 'dependency.vulnerabilities');
        }
      });
    });

    return;
  }

  public preExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return Promise.resolve(jobInfo);
  }
}
