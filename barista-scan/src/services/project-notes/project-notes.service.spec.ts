import { Test, TestingModule } from '@nestjs/testing';

import { ProjectNote } from '@app/models';
import { ProjectNotesService } from '@app/services/project-notes/project-notes.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProjectNotesService', () => {
  let service: ProjectNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectNotesService,
        {
          provide: getRepositoryToken(ProjectNote),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectNotesService>(ProjectNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
