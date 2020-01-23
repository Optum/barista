import { Test, TestingModule } from '@nestjs/testing';

import { ProjectStatusType } from '@app/models';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectStatusTypeService } from './project-status-type.service';

describe('SecurityScanResultItemStatusTypeService', () => {
  let service: ProjectStatusTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectStatusTypeService,
        {
          provide: getRepositoryToken(ProjectStatusType),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectStatusTypeService>(ProjectStatusTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
