import { Test, TestingModule } from '@nestjs/testing';

import { ObligationType } from '@app/models/ObligationType';
import { ObligationTypeService } from '@app/services/obligation-type/obligation-type.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ObligationTypeService', () => {
  let service: ObligationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObligationTypeService,
        {
          provide: getRepositoryToken(ObligationType),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ObligationTypeService>(ObligationTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
