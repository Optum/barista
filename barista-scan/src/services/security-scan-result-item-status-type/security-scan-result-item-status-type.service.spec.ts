import { Test, TestingModule } from '@nestjs/testing';

import { SecurityScanResultItemStatusType } from '@app/models';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SecurityScanResultItemStatusTypeService } from './security-scan-result-item-status-type.service';

describe('SecurityScanResultItemStatusTypeService', () => {
  let service: SecurityScanResultItemStatusTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecurityScanResultItemStatusTypeService,
        {
          provide: getRepositoryToken(SecurityScanResultItemStatusType),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SecurityScanResultItemStatusTypeService>(SecurityScanResultItemStatusTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
