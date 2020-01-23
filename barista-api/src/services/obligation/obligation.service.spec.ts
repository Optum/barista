import { Test, TestingModule } from '@nestjs/testing';

import { Obligation } from '@app/models';
import { ObligationService } from '@app/services/obligation/obligation.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ObligationService', () => {
  let service: ObligationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObligationService, { provide: getRepositoryToken(Obligation), useClass: mockRepository }],
    }).compile();

    service = module.get<ObligationService>(ObligationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
