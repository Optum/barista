import { Test, TestingModule } from '@nestjs/testing';

import { ScanController } from '@app/controllers/scan/scan.controller';
import { ProjectService } from '@app/services/project/project.service';
import { ScanService } from '@app/services/scan/scan.service';
import { ServicesModule } from '@app/services/services.module';
import { AppQueueModule } from '@app/shared/app-queue.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

describe('ScanController (e2e)', () => {
  let app;
  let scanService;
  let projectService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        AppQueueModule,
        ServicesModule,
      ],
      controllers: [ScanController],
    }).compile();

    app = moduleFixture.createNestApplication();
    return app.init();
  });

  beforeEach(() => {
    scanService = app.get(ScanService);
    projectService = app.get(ProjectService);
  });

  it('/scan (GET) returns an array', async (done) => {

    return request(app.getHttpServer())
      .get('/scan')
      .expect(200)
      .then(response => {

        expect(response.body).toBeInstanceOf(Array);
        done();
      });
  });

  describe('Scan e2e Tests', () => {

    let project;
    let scan;

    beforeEach(async () => {
      project = await projectService.db.save({ name: 'test-project', gitUrl: 'http://github.com/test-project' });
      scan = await scanService.db.save({ project });
    });

    it('/scan/?filter[]=project.id||eq||:id (GET) returns only the proper scan objects', async (done) => {

      const project2 = await projectService.db.save({ name: 'test-project2', gitUrl: 'http://github.com/test-project2' });
      const scan2 = await scanService.db.save({ project2 });

      return request(app.getHttpServer())
        .get(`/scan/?filter[]=project.id||eq||${project.id}`)
        .expect(200)
        .then(async response => {

          response.body.forEach((s) => {

            expect(s.id).toBeDefined();
            expect(s.project).toBeInstanceOf(Object);
            expect(s.project.id).toBe(project.id);

          });

          await scanService.db.remove(scan2);
          await projectService.db.remove(project2);
          done();
        });
    });

    it('has an associate project & packageManager', async (done) => {

      const actual = await scanService.db.createQueryBuilder('scan')
        .leftJoinAndSelect('scan.project', 'project')
        .leftJoinAndSelect('project.packageManager', 'project.packageManager')
        .whereInIds(scan.id)
        .getOne();

      expect(actual.project).toBeDefined();
      expect(actual.project.packageManager).toBeDefined();

      done();
    });

    afterEach(async () => {
      await scanService.db.remove(scan);
      return projectService.db.remove(project);
    });

  });

  afterEach(async () => {
    return app.close();
  });
});
