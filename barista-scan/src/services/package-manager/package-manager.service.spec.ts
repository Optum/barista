import { Test, TestingModule } from '@nestjs/testing';

import { PackageManager } from '@app/models/PackageManager';
import { PackageManagerService } from '@app/services/package-manager/package-manager.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PackageManagerService', () => {
  let service: PackageManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackageManagerService,
        {
          provide: getRepositoryToken(PackageManager),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PackageManagerService>(PackageManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
