import { Test, TestingModule } from '@nestjs/testing';

// tslint:disable-next-line:max-line-length
import { SecurityScanResultItemStatusTypeService } from '@app/services/security-scan-result-item-status-type/security-scan-result-item-status-type.service';
import { SecurityScanResultItemStatusTypeController } from './security-scan-result-item-status-type.controller';

describe('SecurityScanResultItemStatusType Controller', () => {
  let controller: SecurityScanResultItemStatusTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecurityScanResultItemStatusTypeController],
      providers: [
        {
          provide: SecurityScanResultItemStatusTypeService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SecurityScanResultItemStatusTypeController>(SecurityScanResultItemStatusTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
