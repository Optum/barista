import { Test, TestingModule } from '@nestjs/testing';

import { MavenService } from './maven.service';

describe('MavenService', () => {
  let service: MavenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MavenService],
    }).compile();

    service = module.get<MavenService>(MavenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
