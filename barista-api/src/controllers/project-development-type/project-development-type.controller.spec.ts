import { Test, TestingModule } from '@nestjs/testing';

import { ProjectDevelopmentTypeService } from '@app/services/project-development-type/project-development-type.service';
import { ProjectDevelopmentTypeController } from './project-development-type.controller';

describe('DeploymentModelType Controller', () => {
  let controller: ProjectDevelopmentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectDevelopmentTypeController],
      providers: [
        {
          provide: ProjectDevelopmentTypeService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProjectDevelopmentTypeController>(ProjectDevelopmentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
