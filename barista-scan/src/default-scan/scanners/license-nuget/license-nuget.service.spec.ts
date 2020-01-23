import { Test, TestingModule } from '@nestjs/testing';

import { LicenseNugetService } from '@app/default-scan/scanners/license-nuget/license-nuget.service';
import * as path from 'path';
import * as nuspecLicensUrlItem from './nuspec-item-license-url.mock.json';

describe('LicenseNugetService', () => {
  let service: LicenseNugetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LicenseNugetService,
        { provide: 'ScanService', useClass: jest.fn() },
        { provide: 'ScanCodeService', useClass: jest.fn() },
        { provide: 'LicenseService', useClass: jest.fn() },
        { provide: 'LicenseScanResultService', useClass: jest.fn() },
        { provide: 'LicenseScanResultItemService', useClass: jest.fn() },
      ],
    }).compile();

    service = module.get<LicenseNugetService>(LicenseNugetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gets package spec filenames', async () => {
    const actual = await service.getPackageSpecFilenames(path.join(__dirname, 'dependencies'));

    expect(actual.length).toEqual(2);
  });

  it('gets package specs as json', async () => {
    const filenames = await service.getPackageSpecFilenames(path.join(__dirname, 'dependencies'));
    const results = await service.getPackageSpecJson(filenames);
    expect(results.length).toEqual(2);

    const actual = results[0];

    expect(actual.description).toBeDefined();
    expect(actual.dir).toBeDefined();
  });

  it('gets a package name from a nuspec', async () => {
    const actual = service.getPackageName(nuspecLicensUrlItem);
    expect(actual).toEqual('jQuery@1.9.1');
  });

  // Note: Leave this excluded just because it writes a file a the local directory
  // and we don't want it to fill up...
  xit('fetches the license from a nuspec', async () => {
    const actual = await service.fetchLicense(nuspecLicensUrlItem);
    expect(actual).toBeDefined();
  });
});
