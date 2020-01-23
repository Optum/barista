import { Test, TestingModule } from '@nestjs/testing';

import { GlobalSearchService } from '@app/services/global-search/global-search.service';

describe('GlobalSearchService', () => {
  let service: GlobalSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalSearchService],
    }).compile();

    service = module.get<GlobalSearchService>(GlobalSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
