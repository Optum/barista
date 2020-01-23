import { Test, TestingModule } from '@nestjs/testing';

import { ProjectController } from '@app/controllers/project/project.controller';
import { UserController } from '@app/controllers/user/user.controller';
import { DeploymentType, OutputFormatType, PackageManager, Project, ProjectStatusType } from '@app/models';
import { ProjectService } from '@app/services/project/project.service';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { AppQueueModule } from '@app/shared/app-queue.module';
import { HttpStatus } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { getAccessToken } from '../shared/util/test-auth-utils';

describe('ProjectController (e2e)', () => {
  let app;
  let projectService;
  let accessToken: string;
  const testProject: Partial<Project> = {
    name: 'test-project',
    gitUrl: 'http://www.github.com/test/test.git',
    packageManager: { code: 'none' } as PackageManager,
    projectStatus: { code: 'new' } as ProjectStatusType,
    outputFormat: { code: 'json' } as OutputFormatType,
    deploymentType: { code: 'unspecified' } as DeploymentType,
  };

  let expected;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        AppOrmModule,
        AppQueueModule,
        ServicesModule,
      ],
      controllers: [ProjectController, UserController],
    }).compile();

    app = moduleFixture.createNestApplication();
    return app.init();
  });

  beforeEach(() => {
    projectService = app.get(ProjectService);
  });

  beforeEach(async () => {
    expected = await projectService.db.save(testProject);
    accessToken = await getAccessToken(app);
  });

  it('/project (GET)', async (done) => {

    return request(app.getHttpServer())
      .get('/project')
      .set('Authorization', `Bearer ${accessToken}`)
      .then(async (response) => {

        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body.length).toBe(1);

        const actual = response.body[0] as Project;

        expect(actual.packageManager).toBeDefined();
        expect(actual.packageManager.code).toEqual(expected.packageManager.code);

        expect(actual.projectStatus).toBeDefined();
        expect(actual.projectStatus.code).toEqual(expected.projectStatus.code);

        expect(actual.outputFormat).toBeDefined();
        expect(actual.outputFormat.code).toEqual(expected.outputFormat.code);

        expect(actual.deploymentType).toBeDefined();
        expect(actual.deploymentType.code).toEqual(expected.deploymentType.code);

      })
      .then(done)
      .catch(done);
  });

  it('/project (POST)', async (done) => {

    return request(app.getHttpServer())
      .post('/project')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(expected).then(async (response) => {

        expect(response.status).toBe(HttpStatus.CREATED);

        const actual = await projectService.db.findOne(response.body.id);

        expect(actual.name).toEqual(expected.name);

        expect(actual.packageManager).toBeDefined();
        expect(actual.packageManager.code).toEqual(expected.packageManager.code);

        expect(actual.projectStatus).toBeDefined();
        expect(actual.projectStatus.code).toEqual(expected.projectStatus.code);

        expect(actual.outputFormat).toBeDefined();
        expect(actual.outputFormat.code).toEqual(expected.outputFormat.code);

        expect(actual.deploymentType).toBeDefined();
        expect(actual.deploymentType.code).toEqual(expected.deploymentType.code);

        done();

      });
  });

  afterEach(async () => {
    await projectService.db.remove(expected);
    return app.close();
  });

});
