import { Test, TestingModule } from '@nestjs/testing';

import { Scan } from '@app/models/Scan';
import { ScanService } from '@app/services/scan/scan.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getQueueToken } from 'nest-bull';

describe('ScanService', () => {
  let service: ScanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScanService,
        { provide: 'LicenseScanResultService', useClass: jest.fn() },
        { provide: 'SecurityScanResultService', useClass: jest.fn() },
        { provide: 'LicenseScanResultItemService', useClass: jest.fn() },
        { provide: 'SecurityScanResultItemService', useClass: jest.fn() },
        { provide: 'BomManualLicenseService', useClass: jest.fn() },
        { provide: 'BomLicenseExceptionService', useClass: jest.fn() },
        { provide: 'BomSecurityExceptionService', useClass: jest.fn() },
        { provide: 'ProjectService', useClass: jest.fn() },
        {
          provide: getRepositoryToken(Scan),
          useClass: mockRepository,
        },
        { provide: getQueueToken('scan-queue'), useValue: { add: jest.fn } },
      ],
    }).compile();

    service = module.get<ScanService>(ScanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
