import { Test, TestingModule } from '@nestjs/testing';

import * as LicenseCheckerOutputMock from './license-checker-output.mock.json';
import { LicenseCheckerService } from './license-checker.service';

describe('LicenseCheckerService', () => {
  let service: LicenseCheckerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LicenseCheckerService,
        { provide: 'ScanService', useClass: jest.fn() },
        { provide: 'LicenseService', useClass: jest.fn() },
        { provide: 'LicenseScanResultService', useClass: jest.fn() },
        { provide: 'LicenseScanResultItemService', useClass: jest.fn() },
      ],
    }).compile();

    service = module.get<LicenseCheckerService>(LicenseCheckerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should extract license objects', async () => {
    const key = '@babel/code-frame@7.0.0';
    const input = LicenseCheckerOutputMock[key];
    const actual = await service.licenseScanResultItemFromJson(key, input);
    expect(actual).toBeDefined();
  });
});
