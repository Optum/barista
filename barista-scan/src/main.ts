// tslint:disable:ordered-imports
import 'module-alias/register';
// Fixes a weird problem where @app modules were not resolved because it was reading the parent package.json
// moduleAlias.addAlias('@app', __dirname);

import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import elasticApm = require('elastic-apm-node');

// tslint:enable:ordered-imports

async function bootstrap() {
  dotenv.config();

  if (process.env.APM_ENABLE) {
    elasticApm.start({
      serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
      serverUrl: process.env.ELASTIC_APM_SERVER_URL,
      verifyServerCert: true,
      captureHeaders: true,
    });
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.API_PORT || 4000);
}

bootstrap();
