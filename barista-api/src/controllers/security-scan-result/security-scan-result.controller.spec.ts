import { Test, TestingModule } from '@nestjs/testing';

import { SecurityScanResultService } from '@app/services/security-scan-result/security-scan-result.service';
import { SecurityScanResultController } from './security-scan-result.controller';

describe('SecurityScanResult Controller', () => {
  let controller: SecurityScanResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecurityScanResultController],
      providers: [
        {
          provide: SecurityScanResultService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SecurityScanResultController>(SecurityScanResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
