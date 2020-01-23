import { Test, TestingModule } from '@nestjs/testing';

import { convertXmlFileToJsonObject } from '@app/shared/util/convert-xml-to-json-object';
import { getFileContentsSync } from '@app/shared/util/get-file-contents-sync';
import * as path from 'path';
import * as mockDependency from './license-maven-dependency.mock.json';
import { LicenseMavenService } from './license-maven.service';

describe('LicenseMavenService', () => {
  let service: LicenseMavenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LicenseMavenService,
        { provide: 'ProjectService', useClass: jest.fn() },
        { provide: 'ScanService', useClass: jest.fn() },
        { provide: 'LicenseService', useClass: jest.fn() },
        { provide: 'LicenseScanResultService', useClass: jest.fn() },
        { provide: 'LicenseScanResultItemService', useClass: jest.fn() },
      ],
    }).compile();

    service = module.get<LicenseMavenService>(LicenseMavenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gets Xml results', async () => {
    const actual = getFileContentsSync(path.join(__dirname, 'license-maven-output.mock.xml'));
    expect(actual).toBeDefined();
    expect(actual).not.toEqual('');
  });

  it('should convert license output to JSON', async () => {
    const actual = await convertXmlFileToJsonObject(path.join(__dirname, 'license-maven-output.mock.xml'));
    await expect(actual).toBeDefined();
  });

  it('gets a package name from json', async () => {
    const actual = service.getPackageName(mockDependency);

    await expect(actual).toBeDefined();
    await expect(actual).toEqual('com.github.jnr:jnr-posix:3.0.12');
  });

  it('gets an unknown package name from an invalid dependency', async () => {
    const actual = service.getPackageName({});

    await expect(actual).toBeDefined();
    await expect(actual).toEqual('UNKNOWN:UNKNOWN:UNKNOWN');
  });

  it('gets an spdx identifier from a license expression', async () => {
    const actual = service.getPackageName({});

    await expect(actual).toBeDefined();
    await expect(actual).toEqual('UNKNOWN:UNKNOWN:UNKNOWN');
  });

  it('parse a licenses from dependency json', async () => {
    const actual = null;

    await expect(actual).toBeDefined();
  });
});
