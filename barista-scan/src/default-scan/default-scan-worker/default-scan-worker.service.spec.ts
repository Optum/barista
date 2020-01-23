import { Test, TestingModule } from '@nestjs/testing';

import { DefaultScanWorkerService } from './default-scan-worker.service';

describe('DefaultScanWorkerService', () => {
  let service: DefaultScanWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DefaultScanWorkerService,
        { provide: 'ProjectService', useClass: jest.fn() },
        { provide: 'ScanService', useClass: jest.fn() },
        { provide: 'ScanCodeService', useClass: jest.fn() },
        { provide: 'LicenseCheckerService', useClass: jest.fn() },
        { provide: 'LicenseMavenService', useClass: jest.fn() },
        { provide: 'LicenseNugetService', useClass: jest.fn() },
        { provide: 'MavenService', useClass: jest.fn() },
        { provide: 'NpmService', useClass: jest.fn() },
        { provide: 'NugetService', useClass: jest.fn() },
        { provide: 'Python3PipService', useClass: jest.fn() },
        { provide: 'Python3PipLicensesService', useClass: jest.fn() },
        { provide: 'DependencyCheckService', useClass: jest.fn() },
        { provide: 'NvdCheckService', useClass: jest.fn() },
      ],
    }).compile();

    service = module.get<DefaultScanWorkerService>(DefaultScanWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
