import { AppService } from '@app/app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  appStatus(): string {
    return this.appService.appStatus();
  }
}
