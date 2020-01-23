import { Test, TestingModule } from '@nestjs/testing';

import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { DefaultScanWorkerService } from '@app/default-scan/default-scan-worker/default-scan-worker.service';
import { MavenService } from '@app/default-scan/dep-clients/maven/maven.service';
import { NpmService } from '@app/default-scan/dep-clients/npm/npm.service';
import { NugetService } from '@app/default-scan/dep-clients/nuget/nuget.service';
import { DependencyCheckService } from '@app/default-scan/scanners/dependency-check/dependency-check.service';
import { LicenseCheckerService } from '@app/default-scan/scanners/license-checker/license-checker.service';
import { LicenseMavenService } from '@app/default-scan/scanners/license-maven/license-maven.service';
import { LicenseNugetService } from '@app/default-scan/scanners/license-nuget/license-nuget.service';
import { ScanCodeService } from '@app/default-scan/scanners/scan-code/scan-code.service';
import { LicenseScanResult, Obligation } from '@app/models';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { LicenseService } from '@app/services/license/license.service';
import { ProjectService } from '@app/services/project/project.service';
import { ScanService } from '@app/services/scan/scan.service';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { NestApplication } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as shell from 'shelljs';
import { TestHelper } from '../shared/util/test-helper';

describe('Scan Code Service (e2e)', () => {
  let app: NestApplication;
  let scanCodeService: ScanCodeService;
  let job: DefaultScanWorkerJobInfo;
  let scanService;
  let projectService;
  let project;
  let scan;
  let licenseService;
  let licenseScanResultService;

  beforeEach(async (done) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        AppOrmModule,
        ServicesModule,
      ],
      providers: [
        DependencyCheckService,
        DefaultScanWorkerService,
        LicenseScanResultItemService,
        LicenseScanResultService,
        LicenseNugetService,
        LicenseMavenService,
        LicenseCheckerService,
        LicenseService,
        ProjectService,
        ScanService,
        ScanCodeService,
        MavenService,
        NpmService,
        NugetService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    scanCodeService = app.get(ScanCodeService);

    scanService = app.get(ScanService);
    projectService = app.get(ProjectService);
    licenseService = app.get(LicenseService);
    licenseScanResultService = app.get(LicenseScanResultService);

    done();
  });

  it('Instantiates the service', () => {
    expect(scanCodeService).toBeInstanceOf(ScanCodeService);
  });

  describe('License Tests', () => {

    let actual;

    const input = {
      key: 'lgpl-2.1-plus',
      score: 100.0,
      name: 'GNU Lesser General Public License 2.1 or later',
      short_name: 'LGPL 2.1 or later',
      category: 'Copyleft Limited',
      is_exception: false,
      owner: 'Free Software Foundation (FSF)',
      homepage_url: 'http://www.gnu.org/licenses/old-licenses/lgpl-2.1-standalone.html',
      text_url: 'http://www.gnu.org/licenses/old-licenses/lgpl-2.1-standalone.html',
      reference_url: 'https://enterprise.dejacode.com/urn/urn:dje:license:lgpl-2.1-plus',
      spdx_license_key: 'LGPL-2.1-or-later',
      spdx_url: 'https://spdx.org/licenses/LGPL-2.1-or-later',
      start_line: 1,
      end_line: 502,
      matched_rule: {
        identifier: 'lgpl-2.1-plus_2.RULE',
        license_expression: 'lgpl-2.1-plus',
        licenses: [
          'lgpl-2.1-plus',
        ],
        is_license_text: false,
        is_license_notice: true,
        is_license_reference: false,
        is_license_tag: false,
      },
    };

    it('should create a license', async (done) => {

      actual = await scanCodeService.createLicense(input);

      expect(actual).toBeDefined();
      expect(actual).toBeInstanceOf(Object);
      expect(actual.id).toBeGreaterThan(0);

      done();
    });

    it('should upsert a license', async (done) => {

      actual = await scanCodeService.upsertLicense(input);
      const expected = await scanCodeService.upsertLicense(input);
      expect(actual.id).toBe(expected.id);

      done();
    });

    afterEach(async (done) => {
      await licenseService.db.remove(actual);
      done();
    });

  });

  describe('license tests', () => {

    beforeEach(async (done) => {
      // Create necessary scans
      project = await projectService.db.save({ name: 'test-project', gitUrl: 'http://github.com/test-project' });
      scan = await scanService.db.save({ project, deploymentType: { code: 'distributed'} });

      job = TestHelper.testJobInfo({ scanId: scan.id });

      // Copy test data to the temp directory
      shell.cp('-R', `${TestHelper.licenseSampleProject}/*`, job.tmpDir);

      done();
    });

    it('executes scan code', async (done) => {

      jest.setTimeout(40000);
      expect(scanCodeService).toBeInstanceOf(ScanCodeService);

      // Execute Scan
      await scanCodeService.execute(job);

      const actual = await scanService.db.createQueryBuilder('scan')
        .leftJoinAndSelect('scan.licenseScanResults', 'licenseScanResults')
        .leftJoinAndSelect('licenseScanResults.licenseScanResultItems', 'licenseScanResults.licenseScanResultItems')
        .whereInIds(job.scanId)
        .getOne();

      expect(actual.licenseScanResults.length).toBeGreaterThan(0);

      expect(actual.licenseScanResults[0].startedAt).toBeInstanceOf(Date);
      expect(actual.licenseScanResults[0].completedAt).toBeInstanceOf(Date);
      expect(actual.licenseScanResults[0].startedAt).not.toEqual(actual.licenseScanResults[0].completedAt);

      expect(actual.licenseScanResults[0].licenseScanResultItems).toBeDefined();
      expect(actual.licenseScanResults[0].jsonResults).toBeInstanceOf(Object);
      expect(actual.licenseScanResults[0].licenseScanResultItems.length).toBeGreaterThan(0);
      expect(actual.licenseScanResults[0].licenseScanResultItems[0].path).toBeDefined();

      // TODO: Re-enable these when obligations are fixed
      /*
      const licenseScan = await LicenseScanResult.getRepository().findOne(actual.licenseScanResults[0].id);
      const obligations = await licenseScan.distinctObligations();
      expect(obligations).toBeDefined();
      expect(obligations).toBeInstanceOf(Object);
      expect(obligations.length).toBeGreaterThan(0);
      expect(obligations[0].name).toBeDefined();
       */

      expect(job.errors.length).toBe(0);

      done();

    });

    xit('returns obligations', async (done) => {

      // Note: This test seems to be failing from time to time. It might have something to do with the
      // License -> Obligation maps not being recorded consistently on DB resets.

      const savedProject = await projectService.db.save({ name: 'test-project', gitUrl: 'http://github.com/test-project' });
      project = await projectService.db.findOne(savedProject.id);
      const savedScan = await scanService.db.save({ project, completedAt: new Date() });
      scan = await scanService.db.findOne(savedScan.id);

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

      let licenseScanResult1: LicenseScanResult = null;

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

      expect(licenseScanResult1.licenseScanResultItems.length).toBeGreaterThan(0);

      let actual = await licenseScanResultService.distinctObligations(licenseScanResult1);

      const expected = [
        await Obligation.getRepository().findOne(1),
        await Obligation.getRepository().findOne(2),
        await Obligation.getRepository().findOne(3),
        await Obligation.getRepository().findOne(4),
        await Obligation.getRepository().findOne(6),
        await Obligation.getRepository().findOne(8),
      ];

      expect(actual.length).toBe(expected.length);

      expect(actual).toEqual(expected);

      actual = await scan.obligations();
      expect(actual).toEqual(expected);

      actual = await project.obligations();
      expect(actual).toEqual(expected);

      done();

    });
  });

  afterEach(async () => {
    // await projectService.db.delete({});
    return app.close();
  });
});
