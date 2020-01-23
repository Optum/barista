import { Test, TestingModule } from '@nestjs/testing';

import { NvdCheckService } from '@app/default-scan/scanners/nvd-check/nvd-check.service';
import * as fs from 'fs';
import { join } from 'path';

describe('NvdCheckService', () => {
  let service: NvdCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NvdCheckService,
        { provide: 'ScanService', useClass: jest.fn() },
        { provide: 'SecurityScanResultService', useClass: jest.fn() },
        { provide: 'SecurityScanResultItemService', useClass: jest.fn() },
      ],
    }).compile();

    service = module.get<NvdCheckService>(NvdCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('parses the NVD page', async done => {
    const html = fs.readFileSync(join(__dirname, 'nvd-search-result.mock.html'), 'utf8');

    const actual = await service.parseCveResultTable('Linux', html);

    expect(actual[0]).toBeDefined();

    expect(actual[0].cveId).toBeDefined();

    expect(actual[0].description).toBeDefined();

    expect(actual[0].displayIdentifier).toBeDefined();

    expect(actual[0].path).toBeDefined();

    expect(actual[0].referenceUrl).toBeDefined();

    done();
  });
});
