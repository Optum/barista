import { Test, TestingModule } from '@nestjs/testing';

import { NugetService } from './nuget.service';

describe('NugetService', () => {
  let service: NugetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NugetService],
    }).compile();

    service = module.get<NugetService>(NugetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
