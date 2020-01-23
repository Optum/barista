// tslint:disable:ordered-imports
import 'reflect-metadata';
import 'module-alias/register';
import { DefaultScanWorkerService } from '@app/default-scan/default-scan-worker/default-scan-worker.service';
import { DefaultScanModule } from '@app/default-scan/default-scan.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DoneCallback, Job } from 'bull';
// tslint:enable:ordered-imports

/**
 * The default scan process.
 * @param job A BullQueue Job instance
 * @param cb A callback function to be executed upon completion.
 */
export default function(job: Job, cb: DoneCallback) {
  async function bootstrap() {
    const logger = new Logger('DefaultScanProcess');
    const app = await NestFactory.createApplicationContext(DefaultScanModule);
    const workerService = app.get(DefaultScanWorkerService);
    logger.log('Starting DefaultScanWorker');
    await workerService.scan(job, cb);
    logger.log('Finished DefaultScanWorker');
    await app.close();
    logger.log('App Closed...');
  }

  bootstrap();
}
