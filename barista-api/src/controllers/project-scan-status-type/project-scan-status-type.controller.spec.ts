import { Test, TestingModule } from '@nestjs/testing';

import { ProjectScanStatusTypeService } from '@app/services/project-scan-status-type/project-scan-status-type.service';
import { ProjectScanStatusTypeController } from './project-scan-status-type.controller';

describe('ProjectScanStatusType Controller', () => {
  let controller: ProjectScanStatusTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectScanStatusTypeController],
      providers: [
        {
          provide: ProjectScanStatusTypeService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProjectScanStatusTypeController>(ProjectScanStatusTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
