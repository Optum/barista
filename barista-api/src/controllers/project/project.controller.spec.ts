import { Test, TestingModule } from '@nestjs/testing';

import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { ProjectService } from '@app/services/project/project.service';
import { SecurityScanResultItemService } from '@app/services/security-scan-result-item/security-scan-result-item.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ProjectController } from './project.controller';

// tslint:disable-next-line:ordered-imports

describe('Project Controller', () => {
  let controller: ProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useClass: jest.fn(),
        },
        {
          provide: LicenseScanResultItemService,
          useClass: jest.fn(),
        },
        {
          provide: SecurityScanResultItemService,
          useClass: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
