import { Test, TestingModule } from '@nestjs/testing';

import { LicenseScanResultItemController } from '@app/controllers/license-scan-result-item/license-scan-result-item.controller';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

describe('LicenseScanResultItemController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), AppOrmModule, ServicesModule],
      controllers: [LicenseScanResultItemController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/license-scan-result-item (GET)', () => {
    return request(app.getHttpServer())
      .get('/license-scan-result-item')
      .expect(200);
  });

  afterEach(async () => {
    return app.close();
  });
});
