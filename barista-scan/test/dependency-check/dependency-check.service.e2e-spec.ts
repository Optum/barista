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
import { SecurityScanResult } from '@app/models';
import { ProjectService } from '@app/services/project/project.service';
import { ScanService } from '@app/services/scan/scan.service';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { NestApplication } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as shell from 'shelljs';
import { TestHelper } from '../shared/util/test-helper';

describe('Dependency Check Service (e2e)', () => {
  let app: NestApplication;
  let service: DependencyCheckService;
  let job: DefaultScanWorkerJobInfo;
  let scanService;
  let projectService;
  let project;
  let scan;

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
        LicenseCheckerService,
        LicenseMavenService,
        LicenseNugetService,
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
    service = app.get(DependencyCheckService);

    scanService = app.get(ScanService);
    projectService = app.get(ProjectService);

    done();
  });

  it('Instantiates the service', () => {
    expect(service).toBeInstanceOf(DependencyCheckService);
  });

  describe('vulnerability tests', () => {

    beforeEach(async (done) => {
      // Create necessary scans
      project = await projectService.db.save({ name: 'test-project', gitUrl: 'http://github.com/test-project' });
      scan = await scanService.db.save({ project });

      job = TestHelper.testJobInfo({ scanId: scan.id });

      // Copy test data to the temp directory
      shell.cp('-R', `${TestHelper.insecureSampleProject}/*`, job.tmpDir);

      done();
    });

    it('detects vulnerabilities', async (done) => {

      jest.setTimeout(30000);
      expect(service).toBeInstanceOf(DependencyCheckService);

      // Execute Scan
      await service.execute(job);

      // const scan: Scan = await scanService.findOne(job.scanId);

      const actual: SecurityScanResult = await SecurityScanResult.findOne({
          where: { scanId: scan.id },
          join: {
            alias: 'result',
            leftJoinAndSelect: {
              scan: 'result.scan',
            },
          },
        },
      );

      expect(actual).toBeDefined();

      expect(actual.startedAt).toBeInstanceOf(Date);
      expect(actual.completedAt).toBeInstanceOf(Date);
      expect(actual.startedAt).not.toEqual(actual.completedAt);

      expect(actual.htmlResults).toBeDefined();
      expect(actual.htmlResults).not.toBeNull();

      expect(actual.jsonResults).toBeDefined();
      expect(actual.jsonResults).not.toEqual('');

      expect(actual.scan).toBeDefined();

      done();
    });

    afterEach(async (done) => {
      // await projectService.db.delete({});
      await projectService.db.remove(project);
      done();
    });
  });

  afterEach(async (done) => {
    await app.close();
    done();
  });
});
