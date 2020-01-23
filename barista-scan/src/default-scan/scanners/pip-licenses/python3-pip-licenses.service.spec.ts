import { Test, TestingModule } from '@nestjs/testing';

import { Python3PipLicensesService } from '@app/default-scan/scanners/pip-licenses/python3-pip-licenses.service';
import * as Python3PipLicensesOutput from './python3-pip-licenses-output.mock.json';

describe('Python3PipLicensesService', () => {
  let service: Python3PipLicensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Python3PipLicensesService,
        { provide: 'ScanService', useClass: jest.fn() },
        { provide: 'LicenseService', useClass: jest.fn() },
        { provide: 'LicenseScanResultService', useClass: jest.fn() },
        { provide: 'LicenseScanResultItemService', useClass: jest.fn() },
      ],
    }).compile();

    service = module.get<Python3PipLicensesService>(Python3PipLicensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should extract license objects', async () => {
    const input = Python3PipLicensesOutput[0];
    const actual = await service.licenseScanResultItemFromJson(input);
    expect(actual).toBeDefined();
  });
});
