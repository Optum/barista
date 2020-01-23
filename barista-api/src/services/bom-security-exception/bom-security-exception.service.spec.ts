import { Test, TestingModule } from '@nestjs/testing';

import { BomSecurityException } from '@app/models';
import { BomSecurityExceptionService } from '@app/services/bom-security-exception/bom-security-exception.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BomSecurityExceptionService', () => {
  let service: BomSecurityExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BomSecurityExceptionService,
        {
          provide: getRepositoryToken(BomSecurityException),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BomSecurityExceptionService>(BomSecurityExceptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
