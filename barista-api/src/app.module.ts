import { AppService } from '@app/app.service';
import { ControllersModule } from '@app/controllers/controllers.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ServicesModule } from './services/services.module';
import { AppQueueModule } from './shared/app-queue.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ControllersModule, AppQueueModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
