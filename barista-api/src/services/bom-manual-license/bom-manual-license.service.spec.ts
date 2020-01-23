import { Test, TestingModule } from '@nestjs/testing';

import { BomManualLicense } from '@app/models';
import { BomManualLicenseService } from '@app/services/bom-manual-license/bom-manual-license.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BomLicenseExceptionService', () => {
  let service: BomManualLicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BomManualLicenseService,
        {
          provide: 'LicenseStatusDeploymentTypeService',
          useClass: jest.fn(),
        },
        {
          provide: getRepositoryToken(BomManualLicense),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BomManualLicenseService>(BomManualLicenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
