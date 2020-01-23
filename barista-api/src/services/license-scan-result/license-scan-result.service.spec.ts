import { Test, TestingModule } from '@nestjs/testing';

import { LicenseScanResult } from '@app/models';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LicenseScanResultItemService', () => {
  let service: LicenseScanResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LicenseScanResultService,
        {
          provide: getRepositoryToken(LicenseScanResult),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LicenseScanResultService>(LicenseScanResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
