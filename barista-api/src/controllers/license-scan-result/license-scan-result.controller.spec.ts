import { Test, TestingModule } from '@nestjs/testing';

import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { LicenseScanResultController } from './license-scan-result.controller';

describe('LicenseScanResult Controller', () => {
  let controller: LicenseScanResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicenseScanResultController],
      providers: [
        {
          provide: LicenseScanResultService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LicenseScanResultController>(LicenseScanResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
