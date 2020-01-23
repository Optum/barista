import { Test, TestingModule } from '@nestjs/testing';

import { SecurityScanResultController } from '@app/controllers/security-scan-result/security-scan-result.controller';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

describe('SecurityScanResultController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), AppOrmModule, ServicesModule],
      controllers: [SecurityScanResultController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/security-scan-result (GET)', () => {
    return request(app.getHttpServer())
      .get('/security-scan-result')
      .expect(200);
  });

  afterEach(async () => {
    return app.close();
  });
});
