import { AppService } from '@app/app.service';
import { AppStatus } from '@app/models/DTOs';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/status')
  @ApiResponse({ status: 200, type: AppStatus })
  appStatus(): string {
    return this.appService.appStatus();
  }
}
