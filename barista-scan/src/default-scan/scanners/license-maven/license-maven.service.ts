import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { MavenService } from '@app/default-scan/dep-clients/maven/maven.service';
import { ScannerBaseService } from '@app/default-scan/scanners/common/scanner-base.service';
import { License, LicenseScanResult, LicenseScanResultItem, Scan } from '@app/models';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { LicenseService } from '@app/services/license/license.service';
import { ProjectService } from '@app/services/project/project.service';
import { ScanService } from '@app/services/scan/scan.service';
import { convertXmlFileToJsonObject } from '@app/shared/util/convert-xml-to-json-object';
import { shellExecuteSync } from '@app/shared/util/shell-execute';
import { Injectable, Logger } from '@nestjs/common';
import * as execa from 'execa';
import * as _ from 'lodash';
import * as pit from 'p-iteration';
import * as path from 'path';

@Injectable()
export class LicenseMavenService extends ScannerBaseService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly scanService: ScanService,
    private readonly licenseService: LicenseService,
    private readonly licenseScanResultService: LicenseScanResultService,
    private readonly licenseScanResultItemService: LicenseScanResultItemService,
  ) {
    super();
  }
  private logger = new Logger('LicenseMavenService');
  name = 'LicenseMavenService';

  public async command(jobInfo: DefaultScanWorkerJobInfo) {
    // Create the Scan with that project
    const scan: Scan = await this.scanService.db
      .createQueryBuilder('scan')
      .leftJoinAndSelect('scan.project', 'project')
      .whereInIds(jobInfo.scanId)
      .getOne();

    // tslint:disable-next-line:max-line-length
    let command = `mvn -e org.codehaus.mojo:license-maven-plugin:2.0.0:aggregate-download-licenses -DlicensesOutputFile=${jobInfo.dataDir}/license-maven-results.xml -DlicensesOutputDirectory=${jobInfo.dataDir}/maven-licenses`;

    command = MavenService.appendSettings(command);

    let customPom = null;
    if (scan.project.customPackageManagerFilename) {
      customPom = path.join(scan.project.customPackageManagerPath, scan.project.customPackageManagerFilename);
    }

    if (customPom) {
      command = `${command} -f ${customPom}`;
    }

    return command;
  }

  public getPackageName(dep: any) {
    let groupId = 'UNKNOWN';
    let artifactId = 'UNKNOWN';
    let version = 'UNKNOWN';

    if (dep.groupId) {
      groupId = dep.groupId;
    }

    if (dep.artifactId) {
      artifactId = dep.artifactId;
    }

    if (dep.version) {
      version = dep.version;
    }

    return `${groupId}:${artifactId}:${version}`;
  }

  public licenseScanResultItemFromJson(key: string, value: any, dependency: any) {
    const result: LicenseScanResultItem = new LicenseScanResultItem();
    result.displayIdentifier = key;
    result.path = key;
    result.rawResults = value;
    result.publisherName = dependency.groupId;
    result.publisherUrl = `https://search.maven.org/artifact/${dependency.groupId}/${dependency.artifactId}/`;
    return result;
  }

  public options(jobInfo: DefaultScanWorkerJobInfo): execa.Options {
    return {
      cwd: jobInfo.tmpDir,
    };
  }

  public partialLicense(licenseKey: string, rawLicense: any): Partial<License> {
    const license = {
      name: licenseKey,
      code: licenseKey,
    } as Partial<License>;

    if (!_.isEmpty(rawLicense.url)) {
      license.referenceUrl = rawLicense.url;
    }

    if (!_.isEmpty(rawLicense.comments)) {
      license.desc = rawLicense.comments;
    }

    return license;
  }

  public async postExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    return new Promise<DefaultScanWorkerJobInfo>(async (resolve, reject) => {
      try {
        const xmlFile = `${jobInfo.dataDir}/license-maven-results.xml`;

        // Update scan object with a scan result object here...
        const scan: Scan = await this.scanService.findOne(jobInfo.scanId);
        const json = await convertXmlFileToJsonObject(xmlFile);

        const rawLicenseScan = {
          jsonResults: json,
          scanTool: 'license-maven',
          startedAt: this.startedAt,
          completedAt: this.completedAt,
          scan,
        };

        const licenseScanResult = await this.licenseScanResultService.insertResult(rawLicenseScan, scan);

        scan.jobInfo.data = jobInfo;

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
    if (!_.isEmpty(licenseScanResult.jsonResults.licenseSummary.dependencies.dependency)) {
      const dependencies = licenseScanResult.jsonResults.licenseSummary.dependencies.dependency;

      // For each dependency
      await pit.forEach(dependencies, async (dependency: any) => {
        try {
          // Get package name
          const packageName = this.getPackageName(dependency);

          if (!_.isEmpty(dependency.licenses.license)) {
            let licenseArray = dependency.licenses.license;
            if (!_.isArray(licenseArray)) {
              licenseArray = [licenseArray];
            }

            await this.processLicenses(licenseArray, packageName, licenseScanResult, dependency);
          } else {
            this.logger.log(`postProcess() Dependency had no licenses: ${JSON.stringify(dependency, null, 2)}`);
          }
        } catch (err) {
          this.logger.error(`postProcess() error: ${err}: ${JSON.stringify(dependencies, null, 2)}`);
        }
      });
    } else {
      this.logger.error(`postProcess() error: No dependencies found!`);
    }

    return;
  }

  public async preExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    shellExecuteSync(`mkdir ${jobInfo.dataDir}/maven-licenses`);
    return Promise.resolve(jobInfo);
  }

  async processLicenses(licenses: any[], packageName: string, licenseScanResult: LicenseScanResult, dependency: any) {
    // For each license
    await pit.forEachSeries(licenses, async (rawLicense: any) => {
      if (!_.isEmpty(rawLicense.name)) {
        try {
          // Create a licenseScanResultItemFromJson
          const resultItem = this.licenseScanResultItemFromJson(packageName, rawLicense, dependency);

          const result = await this.licenseService.bestEffortMatch(rawLicense.name);

          let license = result.license;
          const matchDetails = result.matchDetails;

          if (matchDetails.fuzzyMatch) {
            resultItem.fuzzyMatched = true;
          }

          if (!license) {
            // If we were not able to match a license
            const licenseCode = rawLicense.name;
            const partialLicense = this.partialLicense(licenseCode, rawLicense);

            // Upsert the license
            license = await this.licenseService.upsertLicense(licenseCode, partialLicense);
          }

          await this.licenseScanResultItemService.insertResultItem(resultItem, license, licenseScanResult);
        } catch (e) {
          this.logger.error(`postProcess() error: ${e}: ${JSON.stringify(licenses)}`);
        }
      } else {
        this.logger.error(`postProcess() error: rawLicense had no name: ${JSON.stringify(rawLicense)}`);
      }
    });
  }
}
