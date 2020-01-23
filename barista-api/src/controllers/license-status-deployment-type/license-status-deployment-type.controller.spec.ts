import { Test, TestingModule } from '@nestjs/testing';

import { LicenseStatusDeploymentTypeService } from '@app/services/license-status-deployment-type/license-status-deployment-type.service';
import { LicenseStatusDeploymentTypeController } from './license-status-deployment-type.controller';

describe('LicenseStatusDeploymentType Controller', () => {
  let controller: LicenseStatusDeploymentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicenseStatusDeploymentTypeController],
      providers: [
        {
          provide: LicenseStatusDeploymentTypeService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LicenseStatusDeploymentTypeController>(LicenseStatusDeploymentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
