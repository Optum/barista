import { Test, TestingModule } from '@nestjs/testing';

import { ProjectNotesController } from '@app/controllers/project-notes/project-notes.controller';
import { ProjectNotesService } from '@app/services/project-notes/project-notes.service';

describe('ProjectNotes Controller', () => {
  let controller: ProjectNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectNotesController],
      providers: [
        {
          provide: ProjectNotesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProjectNotesController>(ProjectNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
