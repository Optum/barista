import { Test, TestingModule } from '@nestjs/testing';

import { SecurityScanResultItemController } from '@app/controllers/security-scan-result-item/security-scan-result-item.controller';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

describe('SecurityScanResultItemController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), AppOrmModule, ServicesModule],
      controllers: [SecurityScanResultItemController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/security-scan-result-item (GET)', () => {
    return request(app.getHttpServer())
      .get('/security-scan-result-item')
      .expect(200);
  });

  afterEach(async () => {
    return app.close();
  });
});
