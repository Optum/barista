import { Module } from '@nestjs/common';
import { BullModule } from 'nest-bull';

const AppQueueModuleDefinition = BullModule.forRoot({
  name: 'scan-queue',
  options: {
    redis: {
      enableReadyCheck: true,
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  },
});

@Module({
  imports: [AppQueueModuleDefinition],
  exports: [AppQueueModuleDefinition],
})
export class AppQueueModule {}
