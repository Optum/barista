import { Test, TestingModule } from '@nestjs/testing';

import { SystemConfigurationController } from '@app/controllers/system-configuration/system-configuration.controller';
import { SystemConfigurationService } from '@app/services/system-configuration/system-configuration.service';
import { AppQueueModule } from '@app/shared/app-queue.module';

describe('SystemConfiguration Controller', () => {
  let controller: SystemConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppQueueModule],
      controllers: [SystemConfigurationController],
      providers: [
        {
          provide: SystemConfigurationService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SystemConfigurationController>(SystemConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
