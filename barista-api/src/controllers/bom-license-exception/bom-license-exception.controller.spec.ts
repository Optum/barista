import { Test, TestingModule } from '@nestjs/testing';

import { BomLicenseExceptionController } from '@app/controllers/bom-license-exception/bom-license-exception.controller';
import { BomLicenseExceptionService } from '@app/services/bom-license-exception/bom-license-exception.service';
import { ProjectService } from '@app/services/project/project.service';
import { CqrsModule } from '@nestjs/cqrs';

describe('BomLicenseException Controller', () => {
  let controller: BomLicenseExceptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [BomLicenseExceptionController],
      providers: [
        {
          provide: BomLicenseExceptionService,
          useValue: {},
        },
        {
          provide: ProjectService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BomLicenseExceptionController>(BomLicenseExceptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
