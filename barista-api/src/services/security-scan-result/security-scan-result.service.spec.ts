import { Test, TestingModule } from '@nestjs/testing';

import { SecurityScanResult } from '@app/models';
import { SecurityScanResultService } from '@app/services/security-scan-result/security-scan-result.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SecurityScanResultService', () => {
  let service: SecurityScanResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecurityScanResultService,
        {
          provide: getRepositoryToken(SecurityScanResult),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SecurityScanResultService>(SecurityScanResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
