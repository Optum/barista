import { Test, TestingModule } from '@nestjs/testing';

import { SecurityScanResultItemController } from '@app/controllers/security-scan-result-item/security-scan-result-item.controller';
import { SecurityScanResultItemService } from '@app/services/security-scan-result-item/security-scan-result-item.service';

describe('SecurityScanResultItem Controller', () => {
  let controller: SecurityScanResultItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecurityScanResultItemController],
      providers: [
        {
          provide: SecurityScanResultItemService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SecurityScanResultItemController>(SecurityScanResultItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
