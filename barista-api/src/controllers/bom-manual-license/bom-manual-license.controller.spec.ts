import { Test, TestingModule } from '@nestjs/testing';

import { BomManualLicenseController } from '@app/controllers/bom-manual-license/bom-manual-license.controller';
import { BomManualLicenseService } from '@app/services/bom-manual-license/bom-manual-license.service';
import { LicenseStatusDeploymentTypeService } from '@app/services/license-status-deployment-type/license-status-deployment-type.service';
import { ProjectService } from '@app/services/project/project.service';
import { CqrsModule } from '@nestjs/cqrs';

describe('BomManualLicense Controller', () => {
  let controller: BomManualLicenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [BomManualLicenseController],
      providers: [
        {
          provide: BomManualLicenseService,
          useValue: jest.fn(),
        },
        {
          provide: ProjectService,
          useValue: jest.fn(),
        },
        {
          provide: LicenseStatusDeploymentTypeService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<BomManualLicenseController>(BomManualLicenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
