import { Test, TestingModule } from '@nestjs/testing';

import { ProjectStatusTypeService } from '@app/services/project-status-type/project-status-type.service';
import { ProjectStatusTypeController } from './project-status-type.controller';

describe('ProjectStatusType Controller', () => {
  let controller: ProjectStatusTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectStatusTypeController],
      providers: [
        {
          provide: ProjectStatusTypeService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProjectStatusTypeController>(ProjectStatusTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
