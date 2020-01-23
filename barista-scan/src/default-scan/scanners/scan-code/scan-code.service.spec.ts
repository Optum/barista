import { Test, TestingModule } from '@nestjs/testing';

import * as ScanCodeOutputMock from './scan-code-output.mock.json';
import { ScanCodeService } from './scan-code.service';

describe('ScanCodeService', () => {
  let service: ScanCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScanCodeService,
        { provide: 'ScanService', useClass: jest.fn() },
        { provide: 'LicenseService', useClass: jest.fn() },
        { provide: 'LicenseScanResultService', useClass: jest.fn() },
        { provide: 'LicenseScanResultItemService', useClass: jest.fn() },
      ],
    }).compile();

    service = module.get<ScanCodeService>(ScanCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should extract license objects', async () => {
    const actual: any[] = await service.extractLicenseInformation(ScanCodeOutputMock);

    expect(actual).toBeDefined();
    expect(actual).toBeInstanceOf(Array);
    expect(actual.length).toBeGreaterThan(0);
    expect(actual[0]).toBeDefined();
    expect(actual[0].name).toBeDefined();
    expect(actual[0].file).toBeDefined();
    expect(actual[0].file).toBeInstanceOf(Object);
  });
});
