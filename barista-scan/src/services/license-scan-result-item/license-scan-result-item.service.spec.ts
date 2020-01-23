import { Test, TestingModule } from '@nestjs/testing';

import { LicenseScanResultItem } from '@app/models';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LicenseScanResultItemItemService', () => {
  let service: LicenseScanResultItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LicenseScanResultItemService,
        {
          provide: getRepositoryToken(LicenseScanResultItem),
          useClass: mockRepository,
        },
        {
          provide: 'LicenseStatusDeploymentTypeService',
          useClass: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<LicenseScanResultItemService>(LicenseScanResultItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
