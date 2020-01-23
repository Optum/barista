import { Test, TestingModule } from '@nestjs/testing';

import { LicenseService } from '@app/services/license/license.service';
import { LicenseController } from './license.controller';

describe('License Controller', () => {
  let controller: LicenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicenseController],
      providers: [
        { provide: 'LicenseObligationService', useClass: jest.fn() },
        {
          provide: LicenseService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LicenseController>(LicenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
