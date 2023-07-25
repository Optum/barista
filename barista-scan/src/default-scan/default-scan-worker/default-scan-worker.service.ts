import { LoggerService } from '@app/services/logger/logger.service';
import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { DepClient } from '@app/default-scan/dep-clients/common/dep-client.interface';
import { GolangService } from '@app/default-scan/dep-clients/golang/golang.service';
import { MavenService } from '@app/default-scan/dep-clients/maven/maven.service';
import { NpmService } from '@app/default-scan/dep-clients/npm/npm.service';
import { NugetService } from '@app/default-scan/dep-clients/nuget/nuget.service';
import { Python3PipService } from '@app/default-scan/dep-clients/python/python3-pip.service';
import { Scanner } from '@app/default-scan/scanners/common/scanner.interface';
import { DependencyCheckService } from '@app/default-scan/scanners/dependency-check/dependency-check.service';
import { GoLicensesService } from '@app/default-scan/scanners/go-licenses/go-licenses.service';
import { LicenseCheckerService } from '@app/default-scan/scanners/license-checker/license-checker.service';
import { LicenseMavenService } from '@app/default-scan/scanners/license-maven/license-maven.service';
import { LicenseNugetService } from '@app/default-scan/scanners/license-nuget/license-nuget.service';
import { NvdCheckService } from '@app/default-scan/scanners/nvd-check/nvd-check.service';
import { Python3PipLicensesService } from '@app/default-scan/scanners/pip-licenses/python3-pip-licenses.service';
import { ScanCodeService } from '@app/default-scan/scanners/scan-code/scan-code.service';
import { PackageManager, Scan } from '@app/models';
import { PackageManagerEnum } from '@app/models/PackageManager';
import { ProjectAttribution } from '@app/models/ProjectAttribution';
import { ProjectAttributionService } from '@app/services/project-attribution/project-attribution.service';
import { ProjectService } from '@app/services/project/project.service';
import { ScanLogService } from '@app/services/scan-log/scan-log.service';
import { ScanService } from '@app/services/scan/scan.service';
import { fetchBinaryFromUrl } from '@app/shared/util/fetch-binary-from-url';
import { shellExecuteSync } from '@app/shared/util/shell-execute';
import { unarchiveFile } from '@app/shared/util/unarchive-file';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { DoneCallback, Job } from 'bull';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import { join } from 'path';
import simpleGit, { SimpleGit } from 'simple-git';
import * as tmp from 'tmp';
import * as url from 'url';
import { Processor, Process } from '@nestjs/bull';

@Injectable()
export class DefaultScanWorkerService {
  private dataDir = tmp.dirSync({ unsafeCleanup: true });
  private doneCallback: DoneCallback;
  private git: SimpleGit = simpleGit();
  private job: Job;
  private jobInfo: DefaultScanWorkerJobInfo;
  private logger = new LoggerService('DefaultScanWorkerService');
  private scanners: Scanner[];
  private tmpDir = tmp.dirSync({ unsafeCleanup: true });

  constructor(
    private readonly projectAttributionService: ProjectAttributionService,
    private readonly projectService: ProjectService,
    private readonly scanService: ScanService,
    private readonly scanLogService: ScanLogService,
    @Inject(forwardRef(() => ScanCodeService))
    private readonly scanCodeService: ScanCodeService,
    @Inject(forwardRef(() => LicenseCheckerService))
    private readonly licenseCheckerService: LicenseCheckerService,
    @Inject(forwardRef(() => LicenseMavenService))
    private readonly licenseMavenService: LicenseMavenService,
    @Inject(forwardRef(() => LicenseNugetService))
    private readonly licenseNugetService: LicenseNugetService,
    @Inject(forwardRef(() => DependencyCheckService))
    private readonly dependencyCheckService: DependencyCheckService,
    @Inject(forwardRef(() => NvdCheckService))
    private readonly nvdCheckService: NvdCheckService,
    private readonly golangService: GolangService,
    private readonly mavenService: MavenService,
    private readonly npmService: NpmService,
    private readonly nugetService: NugetService,
    private readonly python3Service: Python3PipService,
    private readonly python3PipLicensesService: Python3PipLicensesService,
    private readonly goLicenseService: GoLicensesService,
  ) {}

  cleanup(info: DefaultScanWorkerJobInfo, error: Error = null, resolve, reject) {
    try {
      if (process.env.NODE_ENV) {
        if (process.env.NODE_ENV.toLowerCase() === 'production') {
          this.logger.debug(
            `*** [process.env.NODE_ENV === ${process.env.NODE_ENV}] Deleting temporary scan directories.`,
          );
          this.tmpDir.removeCallback();
          this.dataDir.removeCallback();
        } else {
          this.logger.debug(
            `*** [process.env.NODE_ENV === ${process.env.NODE_ENV}] NOT Deleting temporary scan directories.`,
          );
        }
      }

      this.job.progress(100);
      this.doneCallback(error, { info });

      if (error) {
        this.logger.error(error.toLocaleString());
        reject(error);
      } else {
        resolve();
      }
    } catch (e) {
      this.logger.error(e.toLocaleString());
      reject(e);
    }
  }

  // Helper Metods
  depClient(packageManager: PackageManager, workingDirectory: string): DepClient {
    let client: DepClient;

    switch (packageManager.code) {
      case 'golang-modules': {
        client = this.golangService;
        break;
      }
      case 'maven': {
        client = this.mavenService;
        break;
      }
      case 'npm': {
        client = this.npmService;
        break;
      }
      case 'nuget': {
        client = this.nugetService;
        break;
      }
      case 'python3-pip': {
        client = this.python3Service;
        break;
      }
      case 'python2_7-pip': {
        client = this.python3Service;
        client.packageManagerCode = PackageManagerEnum.PYTHON2_7_PIP;
        break;
      }
      default: {
        client = null;
        break;
      }
    }

    return client;
  }

  async fetchDependencies(scan: Scan, depClient: DepClient, jobInfo: DefaultScanWorkerJobInfo) {
    const project = scan.project;

    let workingDirectory = jobInfo.tmpDir;

    if (depClient) {
      const options: any = {};
      options.scan = scan;

      if (project.customPackageManagerPath) {
        options.customPackageManagerPath = project.customPackageManagerPath;
        if (project.packageManager.code != PackageManagerEnum.GO.toString()) {
          workingDirectory = join(jobInfo.tmpDir, project.customPackageManagerPath);
        }
      }

      if (project.customPackageManagerFilename) {
        options.customPackageManagerFilename = project.customPackageManagerFilename;
      } else if (project.packageManager.code === PackageManagerEnum.NUGET.toString()) {
        // If this is a nuget project, let's look for a solution file in the root of the repo if one does not exist.
        // Let's check for a .sln file since the user did not specify one
        const slnFiles = fs.readdirSync(workingDirectory).filter((fn) => fn.endsWith('.sln'));

        if (slnFiles && slnFiles.length > 0) {
          // If we did find a solution file in the working directory, let's go ahead and take the first one we find
          // Nuget throws an error if there is more than one and we don't specify which to use.
          options.customPackageManagerFilename = slnFiles[0];
        }
      }
      options.useMavenCustomSettings = !this.isGitHubCom(scan.project.gitUrl);
      this.logger.log('userMavenCustom = ' + options.useMavenCustomSettings);

      return depClient.fetchDependencies(workingDirectory, options, jobInfo.dataDir);
    } else {
      this.logger.log('No package manager configured, not fetching dependencies.');
      return Promise.resolve();
    }
  }

  isGitHubCom(gitUrl: string) {
    const urlParts = url.parse(gitUrl);
    return urlParts.hostname.toLowerCase() === 'github.com';
  }

  replaceGitHubPassword(gitUrl: string) {
    const url = new URL(gitUrl);
    if (url.password) {
      return gitUrl.replace(url.password, '*******');
    } else {
      return gitUrl;
    }
  }

  replaceGitHubPasswordInString(content: string, gitUrl: string) {
    const url = new URL(gitUrl);
    if (url.password) {
      return content.replace(url.username + ':' + url.password, url.username + ':*******');
    } else {
      return content;
    }
  }

  deleteFolderRecursive(filePath, ignorePath) {
    if (ignorePath.replace(/\/+$/, '') === filePath.replace(/\/+$/, '')) {
      return;
    }
    if (fs.existsSync(filePath)) {
      fs.readdirSync(filePath).forEach((file, index) => {
        const curPath = path.join(filePath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          this.deleteFolderRecursive(curPath, ignorePath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
    }
  }
  async scan(job: Job<any>, callback: DoneCallback) {
    return new Promise<void>(async (resolve, reject) => {
      this.jobInfo = {};
      this.jobInfo.errors = [];
      this.job = job;
      this.doneCallback = callback;

      // Create the Scan with that project
      const scan: Scan = await this.scanService.db
        .createQueryBuilder('scan')
        .leftJoinAndSelect('scan.project', 'project')
        .leftJoinAndSelect('project.packageManager', 'packageManager')
        .leftJoinAndSelect('project.developmentType', 'developmentType')
        .leftJoinAndSelect('scan.deploymentType', 'deploymentType')
        .whereInIds(job.data.scanId)
        .getOne();

      try {
        this.jobInfo.appDir = path.resolve(__dirname, '../../../src');

        this.jobInfo.tmpDir = this.tmpDir.name;
        this.jobInfo.dataDir = this.dataDir.name;

        this.jobInfo.scanId = scan.id;
        this.jobInfo.projectName = scan.project.name;

        this.job.progress(5);

        this.logger.fileTransport(this.jobInfo.dataDir + '/output.txt');
        this.logger.scanId = this.jobInfo.scanId;
        this.logger.log(`this.jobInfo: ${JSON.stringify(this.jobInfo, null, 2)}`);
        this.logger.log('datadir = ' + this.jobInfo.dataDir);
        // Let's apply any security credentials we might have for the project
        const gitUrl = await this.projectService.gitUrlAuthForProject(scan.project);

        const doScanProcess = async (isSourceCode: boolean = true) => {
          let progress = 10;
          this.job.progress(progress);

          shellExecuteSync('pwd', { cwd: this.jobInfo.tmpDir }, this.jobInfo.dataDir);

          scan.startedAt = new Date();
          await scan.save();

          const scannerPromises = [];

          const scanners = [];

          // If the project has a gitUrl then let's do a real scan of the source code
          if (isSourceCode) {
            const depClient = this.depClient(scan.project.packageManager, this.jobInfo.tmpDir);

            await this.fetchDependencies(scan, depClient, this.jobInfo);

            scanners.push(this.dependencyCheckService);

            if (depClient) {
              // Let's decide which license services to user based on the package manager.
              switch (depClient.packageManagerCode) {
                case PackageManagerEnum.GO: {
                  scanners.push(this.goLicenseService);
                  break;
                }
                case PackageManagerEnum.MAVEN: {
                  scanners.push(this.licenseMavenService);
                  break;
                }
                case PackageManagerEnum.NPM: {
                  scanners.push(this.licenseCheckerService);
                  break;
                }
                case PackageManagerEnum.NUGET: {
                  scanners.push(this.licenseNugetService);
                  break;
                }
                case PackageManagerEnum.PYTHON3_PIP: {
                  scanners.push(this.python3PipLicensesService);
                  break;
                }
                default: {
                  // If we have a package manager of 'non', let's just scan using scan code even though it's slower
                  scanners.push(this.scanCodeService);
                  break;
                }
              }
            } else {
              // If we don'thave a package manager, let's just scan using scan code even though it's slower
              scanners.push(this.scanCodeService);
            }
          } else {
            // If the project does not have a gitUrl then let's just check the NVD
            scanners.push(this.nvdCheckService);
          }

          for (const scanner of scanners) {
            scannerPromises.push(
              new Promise<void>(async (scanPromiseResolve) => {
                this.logger.log(`Starting ${scanner.name}`);
                await scanner.execute(this.jobInfo);

                // TODO: Make this report a more accurate progress potentially with a callback within the scanner to capture steps
                progress = progress + 10;

                this.job.progress(progress);

                this.logger.log(`Finished ${scanner.name}`);

                scanPromiseResolve();
              }),
            );
          }

          await Promise.all(scannerPromises);

          await scan.reload();
          scan.completedAt = new Date();
          await scan.save();

          this.logger.log('Updating Attributions');

          try {
            const licenseAttribtions = await this.scanService.distinctLicenseAttributions(scan.id);

            const projectAttribution = new ProjectAttribution();
            projectAttribution.attribution = '';
            projectAttribution.project = scan.project;
            licenseAttribtions.forEach((license) => {
              projectAttribution.attribution += 'Package: ';
              projectAttribution.attribution += license.packageName + '\n\n';
              projectAttribution.attribution += 'License: ';
              projectAttribution.attribution += license.clearDefined
                ? license.clearDefined.license !== 'OTHER'
                  ? license.clearDefined.license
                  : license.license
                : license.license;
              projectAttribution.attribution += '\n\n';
              projectAttribution.attribution += 'Copyrights: \n';
              projectAttribution.attribution += license.clearDefined?.copyrights ? license.clearDefined.copyrights : '';
              projectAttribution.attribution += '\n\n';
              projectAttribution.attribution += 'License Text: \n';
              projectAttribution.attribution += license.clearDefined?.licensetext
                ? license.clearDefined.licensetext !== 'OTHER'
                  ? license.clearDefined.licensetext
                  : license.licenselink
                : license.licenselink;
              projectAttribution.attribution += '\n\n';
              projectAttribution.attribution +=
                '-------------------------------------------------------------------------------------------------------------------------------';
              projectAttribution.attribution += '\n\n';
            });

            await this.projectAttributionService.insertAttribution(projectAttribution);
          } catch (error) {
            this.logger.error(error);
          }

          try {
            await this.scanService.sendMailOnScanCompletion(scan);
          } catch (error) {
            this.logger.log('Send Mail Error');
            this.logger.error(error);
          }
          const scanLog = this.scanLogService.db.create();
          scanLog.scan = scan;
          scanLog.log = fs.readFileSync(this.jobInfo.dataDir + '/output.txt').toString();
          await scanLog.save();

          this.cleanup(this.jobInfo, null, resolve, reject);
        };

        if (!_.isEmpty(scan.project.pathToUploadFileForScanning)) {
          this.logger.log('Fetching pathToUploadFileForScanning');
          const archiveFilename = await fetchBinaryFromUrl(
            scan.project.pathToUploadFileForScanning,
            this.jobInfo.tmpDir,
          );

          await unarchiveFile(path.join(this.jobInfo.tmpDir, archiveFilename), this.jobInfo.tmpDir);

          await doScanProcess();
        } else if (!_.isEmpty(gitUrl)) {
          this.logger.log('Cloning Git Repository = ' + this.replaceGitHubPassword(gitUrl));
          const gitBranch = scan.tag;
          const gitOptions = [];
          if (gitBranch) {
            this.logger.log('Branch = ' + gitBranch);
            gitOptions.push('--branch');
            gitOptions.push(gitBranch);
          } else {
            this.logger.log('Branch = default branch');
            gitOptions.push('--depth');
            gitOptions.push('1');
          }

          scan.startedAt = new Date();
          await scan.save();
          try {
            await this.git.clone(gitUrl, this.jobInfo.tmpDir, gitOptions);
            if (
              scan.project.customPackageManagerPath &&
              scan.project.packageManager.code != PackageManagerEnum.GO.toString()
            ) {
              this.deleteFolderRecursive(
                this.jobInfo.tmpDir,
                path.join(this.jobInfo.tmpDir, scan.project.customPackageManagerPath),
              );
            }
            await doScanProcess();
          } catch (cloneError) {
            await this.logger.error(`Clone Error: ${this.replaceGitHubPasswordInString(cloneError, gitUrl)}`);

            await scan.reload();
            scan.completedAt = new Date();
            await scan.save();

            const scanLog = this.scanLogService.db.create();
            scanLog.scan = scan;
            scanLog.log = fs.readFileSync(this.jobInfo.dataDir + '/output.txt').toString();
            await scanLog.save();

            this.cleanup(this.jobInfo, null, resolve, reject);

            try {
              await this.scanService.sendMailOnScanCompletion(scan);
            } catch (error) {
              this.logger.error(error);
            }
          }
        } else {
          this.logger.log('No pathToUploadFileForScanning and no gitURL, so isSourceCode = false');
          await doScanProcess(false);
        }
      } catch (error) {
        this.logger.error('ScanProcess Error' + error);

        scan.completedAt = new Date();
        await scan.save();

        const scanLog = this.scanLogService.db.create();
        scanLog.scan = scan;
        scanLog.log = fs.readFileSync(this.jobInfo.dataDir + '/output.txt').toString();
        await scanLog.save();

        this.cleanup(this.jobInfo, error, resolve, reject);
      }
    });
  }
}
