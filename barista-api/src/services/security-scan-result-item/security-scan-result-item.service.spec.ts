import { Test, TestingModule } from '@nestjs/testing';

import { SecurityScanResultItem } from '@app/models';
import { SecurityScanResultItemService } from '@app/services/security-scan-result-item/security-scan-result-item.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SecurityScanResultItemService', () => {
  let service: SecurityScanResultItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecurityScanResultItemService,
        {
          provide: getRepositoryToken(SecurityScanResultItem),
          useClass: mockRepository,
        },
        {
          provide: 'VulnerabilityStatusDeploymentTypeService',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SecurityScanResultItemService>(SecurityScanResultItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
