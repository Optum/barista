import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { License, LicenseScanResult, LicenseScanResultItem, Project, Scan } from '@app/models';
import * as path from 'path';
import { join } from 'path';
import * as tmp from 'tmp';

export class TestHelper {

  // tslint:disable:member-ordering
  static testDataDirectory: string = join(__dirname + '/../test-data');
  static insecureSampleProject: string = join(TestHelper.testDataDirectory + '/positive');
  static licenseSampleProject: string = join(TestHelper.testDataDirectory + '/license');
  static nugetSampleProject: string = join(TestHelper.testDataDirectory + '/nuget-packages');
  static mavenSampleProject: string = join(TestHelper.testDataDirectory + '/maven-packages');

  // tslint:enable:member-ordering

  static async createLicenseScan(scan: Scan) {
    // Construct license scan result
    const licenseScanResult = new LicenseScanResult();
    licenseScanResult.scan = scan;
    await scan.save();
    licenseScanResult.scanTool = 'test';
    licenseScanResult.licenseScanResultItems = [];
    licenseScanResult.completedAt = new Date();
    // Add license scan results
    await licenseScanResult.save();
    await licenseScanResult.reload();
    return licenseScanResult;
  }

  static async createLicenseScanResult(licenseScanResult: LicenseScanResult, licenseId: number) {
    const item = new LicenseScanResultItem();
    item.license = await License.getRepository().findOne(licenseId);
    item.path = './';
    item.licenseScan = licenseScanResult;
    await item.save();
    licenseScanResult.licenseScanResultItems.push(item);
    return await licenseScanResult.save();
  }

  static async createProjectLicenseScanResult() {
    const savedProject = await Project.getRepository().save({ name: 'test-project', gitUrl: 'http://github.com/test-project' });
    const project = await Project.getRepository().findOne(savedProject.id);
    const savedScan = await Scan.getRepository().save({ project, completedAt: new Date() });
    const scan = await Scan.getRepository().findOne(savedScan.id);

    await new Promise((resolve) => {
      setTimeout(async () => {
        await TestHelper.createLicenseScan(scan);
        resolve();
      }, 1234);
    });

    await new Promise((resolve) => {
      setTimeout(async () => {
        await TestHelper.createLicenseScan(scan);
        resolve();
      }, 1234);
    });

    let licenseScanResult1: LicenseScanResult;

    await new Promise((resolve) => {
      setTimeout(async () => {
        licenseScanResult1 = await TestHelper.createLicenseScan(scan);
        resolve();
      }, 1234);
    });

    // Add several licenses with duplicates
    await TestHelper.createLicenseScanResult(licenseScanResult1, 1);
    await TestHelper.createLicenseScanResult(licenseScanResult1, 1);
    await TestHelper.createLicenseScanResult(licenseScanResult1, 2);
    await TestHelper.createLicenseScanResult(licenseScanResult1, 2);
    await TestHelper.createLicenseScanResult(licenseScanResult1, 3);
    await TestHelper.createLicenseScanResult(licenseScanResult1, 3);
    await TestHelper.createLicenseScanResult(licenseScanResult1, 4);
    await TestHelper.createLicenseScanResult(licenseScanResult1, 4);

    await scan.reload();
    return scan;
  }

  static testJobInfo(partial: Partial<DefaultScanWorkerJobInfo> = {}): any {
    const jobInfo: DefaultScanWorkerJobInfo = {};
    jobInfo.errors = [];
    jobInfo.appDir = path.resolve(__dirname, '../../../src');

    const dirs = {
      tmpDir: tmp.dirSync(),
      dataDir: tmp.dirSync(),
    };

    jobInfo.tmpDir = dirs.tmpDir.name;
    jobInfo.dataDir = dirs.dataDir.name;

    jobInfo.projectName = 'test-project';

    return {
      ...partial,
      ...jobInfo,
      dirs,
    } as DefaultScanWorkerJobInfo;
  }
}
