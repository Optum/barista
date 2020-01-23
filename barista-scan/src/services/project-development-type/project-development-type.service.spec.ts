import { Test, TestingModule } from '@nestjs/testing';

import { ProjectDevelopmentType } from '@app/models/ProjectDevelopmentType';
import { ProjectDevelopmentTypeService } from '@app/services/project-development-type/project-development-type.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProjectDevelopmentTypeService', () => {
  let service: ProjectDevelopmentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectDevelopmentTypeService,
        {
          provide: getRepositoryToken(ProjectDevelopmentType),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectDevelopmentTypeService>(ProjectDevelopmentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
