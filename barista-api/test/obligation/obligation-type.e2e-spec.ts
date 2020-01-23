import { Test, TestingModule } from '@nestjs/testing';

import { ObligationTypeController } from '@app/controllers/obligation-type/obligation-type.controller';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

describe('ObligationTypeController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), AppOrmModule, ServicesModule],
      controllers: [ObligationTypeController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/obligation-type (GET)', () => {
    return request(app.getHttpServer())
      .get('/obligation-type')
      .expect(200);
  });

  afterEach(async () => {
    return app.close();
  });
});
