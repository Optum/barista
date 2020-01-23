import { Test, TestingModule } from '@nestjs/testing';

import { GlobalSearchController } from '@app/controllers/global-search/global-search.controller';
import { GlobalSearchService } from '@app/services/global-search/global-search.service';

describe('Project Controller', () => {
  let controller: GlobalSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalSearchController],
      providers: [
        {
          provide: GlobalSearchService,
          useClass: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<GlobalSearchController>(GlobalSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
