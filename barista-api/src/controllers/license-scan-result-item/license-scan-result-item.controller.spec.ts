import { Test, TestingModule } from '@nestjs/testing';

import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultItemController } from './license-scan-result-item.controller';

describe('LicenseScanResultItem Controller', () => {
  let controller: LicenseScanResultItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicenseScanResultItemController],
      providers: [
        {
          provide: LicenseScanResultItemService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LicenseScanResultItemController>(LicenseScanResultItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
