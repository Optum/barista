import { Test, TestingModule } from '@nestjs/testing';

import { Obligation } from '@app/models';
import { ObligationService } from '@app/services/obligation/obligation.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObligationController } from './obligation.controller';

describe('Obligation Controller', () => {
  let controller: ObligationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObligationController],
      providers: [
        ObligationService,
        { provide: 'LicenseService', useClass: jest.fn() },
        { provide: getRepositoryToken(Obligation), useClass: mockRepository },
      ],
    }).compile();

    controller = module.get<ObligationController>(ObligationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
