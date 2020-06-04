// tslint:disable:ordered-imports
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';
import Arena from 'bull-arena';
import * as dotenv from 'dotenv';
import 'module-alias/register';
import 'reflect-metadata';
import { AppModule } from './app.module';
import elasticApm = require('elastic-apm-node');
// tslint:enable:ordered-imports

CrudConfigService.load({
  query: {
    limit: 50,
  },
});

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
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('Barista API')
    .setDescription('REST API documentation for the Barista system')
    .setVersion('1.0')
    .addBearerAuth()
    .addOAuth2()
    .addTag('BomLicenseException', 'Methods')
    .addTag('BomManualLicense', 'Methods')
    .addTag('BomSecurityException', 'Methods')
    .addTag('DeploymentType', 'Methods')
    .addTag('License', 'Methods')
    .addTag('LicenseScanResult', 'Methods')
    .addTag('LicenseScanResultItem', 'Methods')
    .addTag('LicenseStatusDeploymentType', 'Methods')
    .addTag('Obligation', 'Methods')
    .addTag('ObligationType', 'Methods')
    .addTag('OutputFormatType', 'Methods')
    .addTag('PackageManager', 'Methods')
    .addTag('Project', 'Methods')
    .addTag('ProjectDevelopmentType', 'Methods')
    .addTag('ProjectStatusType', 'Methods')
    .addTag('ProjectScanStatusType', 'Methods')
    .addTag('Scan', 'Methods')
    .addTag('SecurityScanResult', 'Methods')
    .addTag('SecurityScanResultItem', 'Methods')
    .addTag('SecurityScanResultItemStatusType', 'Methods')
    .addTag('SystemConfiguration', 'Methods')
    .addTag('ToolTip', 'Methods')
    .addTag('User', 'Methods')
    .addTag('VulnerabilityStatusDeploymentType', 'Methods')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/api-docs', app, document);

  const arena = Arena(
    {
      queues: [
        {
          name: 'scan-queue',
          hostId: 'barista-queue',
          host: process.env.REDIS_HOST || 'localhost',
          port: Number(process.env.REDIS_PORT) || 6379,
          prefix: '{barista}:',
        },
      ],
    },
    {
      basePath: '/arena',
      disableListen: true,
    },
  );

  app.use(arena);
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  await app.listen(process.env.API_PORT || 3000);
}

bootstrap();
