import { Test, TestingModule } from '@nestjs/testing';

import { LicenseScanResultController } from '@app/controllers/license-scan-result/license-scan-result.controller';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

describe('LicenseScanResultController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), AppOrmModule, ServicesModule],
      controllers: [LicenseScanResultController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/license-scan-result (GET)', () => {
    return request(app.getHttpServer())
      .get('/license-scan-result')
      .expect(200);
  });

  afterEach(async () => {
    return app.close();
  });
});
