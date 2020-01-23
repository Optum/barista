import { Test, TestingModule } from '@nestjs/testing';

import { Python3PipService } from '@app/default-scan/dep-clients/python/python3-pip.service';

describe('Python3PipService', () => {
  let service: Python3PipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Python3PipService],
    }).compile();

    service = module.get<Python3PipService>(Python3PipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
