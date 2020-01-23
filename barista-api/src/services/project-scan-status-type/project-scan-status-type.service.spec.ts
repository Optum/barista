import { Test, TestingModule } from '@nestjs/testing';

import { ProjectScanStatusType } from '@app/models';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectScanStatusTypeService } from './project-scan-status-type.service';

describe('SecurityScanResultItemStatusTypeService', () => {
  let service: ProjectScanStatusTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectScanStatusTypeService,
        {
          provide: getRepositoryToken(ProjectScanStatusType),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectScanStatusTypeService>(ProjectScanStatusTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
