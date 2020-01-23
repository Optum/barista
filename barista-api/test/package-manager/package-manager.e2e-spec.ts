import { Test, TestingModule } from '@nestjs/testing';

import { PackageManagerController } from '@app/controllers/package-manager/package-manager.controller';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

describe('PackageManager (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), AppOrmModule, ServicesModule],
      controllers: [PackageManagerController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/package-manager (GET)', () => {
    return request(app.getHttpServer())
      .get('/package-manager')
      .expect(200);
  });

  afterEach(async () => {
    return app.close();
  });
});
