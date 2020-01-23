import { Test, TestingModule } from '@nestjs/testing';

import * as DependencyCheckItemMock from '@app/default-scan/scanners/dependency-check/dependency-check-item.mock.json';
import * as DependencyCheckOutputMock from '@app/default-scan/scanners/dependency-check/dependency-check-output.mock.json';
import { DependencyCheckService } from './dependency-check.service';

describe('NvdCheckService', () => {
  let service: DependencyCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DependencyCheckService,
        { provide: 'ScanService', useClass: jest.fn() },
        { provide: 'SecurityScanResultService', useClass: jest.fn() },
        { provide: 'SecurityScanResultItemService', useClass: jest.fn() },
      ],
    }).compile();

    service = module.get<DependencyCheckService>(DependencyCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should extract vulnerable dependencies', async () => {
    const dependencies: any[] = DependencyCheckOutputMock.dependencies;

    const actual = service.getVulnerableDependencies(dependencies);

    expect(actual.length).toBeLessThan(dependencies.length);
  });

  it('should extract package name', async () => {
    const actual = service.getPackageName(
      DependencyCheckItemMock,
      '/private/var/folders/m3/0y7lpszn4vg9yvj9gf5q_b880000gn/T/tmp-787691k7hYQgvoWys',
    );
    const expected = 'pkg:javascript/jquery@2.1.1';

    expect(actual).toEqual(expected);
  });

  it('should extract file name with no package name', async () => {
    const dependency = DependencyCheckItemMock;
    delete dependency.packages;
    const actual = service.getPackageName(
      dependency,
      '/private/var/folders/m3/0y7lpszn4vg9yvj9gf5q_b880000gn/T/tmp-787691k7hYQgvoWys',
    );
    const expected = 'node_modules/jquery/dist/jquery.min.js';

    expect(actual).toEqual(expected);
  });

  it('should create a security result item', async () => {
    const actual = service.createSecurityScanResultItem(
      'pkg:javascript/jquery@2.1.1',
      DependencyCheckItemMock.vulnerabilities[0],
    );
    expect(actual).toBeDefined();
  });
});
