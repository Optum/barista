import { Test, TestingModule } from '@nestjs/testing';

import { BomLicenseException } from '@app/models';
import { BomLicenseExceptionService } from '@app/services/bom-license-exception/bom-license-exception.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BomLicenseExceptionService', () => {
  let service: BomLicenseExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BomLicenseExceptionService,
        {
          provide: getRepositoryToken(BomLicenseException),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BomLicenseExceptionService>(BomLicenseExceptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
