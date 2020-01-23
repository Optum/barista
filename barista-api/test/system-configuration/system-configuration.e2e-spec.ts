import { Test, TestingModule } from '@nestjs/testing';

import { SystemConfigurationController } from '@app/controllers/system-configuration/system-configuration.controller';
import { SystemConfiguration } from '@app/models';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

describe('SystemConfiguration (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(), AppOrmModule, ServicesModule],
      controllers: [SystemConfigurationController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  it('/system-configuration (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/system-configuration')
      .expect(200)
      .then(response => {

        expect(response.body).toBeInstanceOf(Object);

        const actual: SystemConfiguration = response.body;
        expect(actual.code).toEqual('default');

        done();
      });
  });

  afterEach(async () => {
    return app.close();
  });
});
