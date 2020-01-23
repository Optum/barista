import { Test, TestingModule } from '@nestjs/testing';
// tslint:disable-next-line:ordered-imports
import { License } from '@app/models/License';
import { LicenseService } from '@app/services/license/license.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = {
  metadata: {
    columns: [],
    relations: [],
  },
  find: jest.fn(),
};

describe('LicenseService', () => {
  let service: LicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicenseService, { provide: getRepositoryToken(License), useValue: mockRepository }],
    }).compile();

    service = module.get<LicenseService>(LicenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gets an spdx identifier from a license expression', () => {
    const actual = LicenseService.getSpdxId('GNU General Public License Version 2');
    const expected = 'GPL-2.0-only';
    expect(actual).toEqual(expected);
  });

  it('fuzzy matches from existing licenses', async done => {
    // Return mock license results

    mockRepository.find.mockReturnValueOnce([
      { name: 'XXXX', code: 'xxx' },
      { name: 'Common Public License 1.0', code: 'CPL-1.0' },
      { name: 'Common Public', code: 'not-CPL-1.0' },
    ]);
    const actual = await service.fuzzyMatchLicense('Common Public License Version 1.0');
    const expected = 'CPL-1.0';
    expect(actual.code).toEqual(expected);

    done();
  });
});
