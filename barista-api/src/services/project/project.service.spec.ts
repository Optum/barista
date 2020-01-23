import { Test, TestingModule } from '@nestjs/testing';

import { Project } from '@app/models/Project';
import { ProjectService } from '@app/services/project/project.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        { provide: 'BomManualLicenseService', useClass: jest.fn() },
        { provide: 'ScanService', useClass: jest.fn() },
        { provide: getRepositoryToken(Project), useClass: mockRepository },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
