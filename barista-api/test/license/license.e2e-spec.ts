import { Test, TestingModule } from '@nestjs/testing';

import { LicenseController } from '@app/controllers/license/license.controller';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

describe('LicenseController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), AppOrmModule, ServicesModule],
      controllers: [LicenseController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/license (GET)', () => {
    return request(app.getHttpServer())
      .get('/license')
      .expect(200);
  });

  afterEach(async () => {
    return app.close();
  });
});
