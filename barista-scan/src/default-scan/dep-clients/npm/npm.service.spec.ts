import { Test, TestingModule } from '@nestjs/testing';

import { NpmService } from './npm.service';

describe('NpmService', () => {
  let service: NpmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NpmService],
    }).compile();

    service = module.get<NpmService>(NpmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
