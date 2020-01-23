import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ScannerBaseService } from '@app/default-scan/scanners/common/scanner-base.service';
import { QueueFeedback } from '@app/queue-feedback';
import { shellExecute, shellExecuteSync } from '@app/shared/util/shell-execute';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from 'nest-bull';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BullModule.forRoot({
      name: 'scan-queue',
      options: {
        redis: {
          enableReadyCheck: true,
          host: process.env.REDIS_HOST || 'localhost',
          port: Number(process.env.REDIS_PORT) || 6379,
        },
      },
      processors: [
        {
          concurrency: 5,
          name: 'default-scan',
          path: join(__dirname, 'default-scan/default-scan-process.js'),
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [QueueFeedback, AppService],
})
export class AppModule {
  logger = new Logger('AppModule');

  constructor(appService: AppService) {
    this.logger.warn(appService.prettyAppStatus());

    shellExecuteSync('mono -V');
    shellExecuteSync('npm -v');
    shellExecuteSync('mvn --version');

    // Let's update dependency check at start so that a scan won't have to wait on it.
    shellExecute(`${ScannerBaseService.toolsDir}/dependency-check/bin/dependency-check.sh --updateonly`).then(() => {
      this.logger.debug('dependency-check update complete.');
    });
  }
}
