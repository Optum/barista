import { Test, TestingModule } from '@nestjs/testing';

import { LicenseStatusDeploymentType } from '@app/models';
import { LicenseStatusDeploymentTypeService } from '@app/services/license-status-deployment-type/license-status-deployment-type.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LicenseStatusDeploymentTypeService', () => {
  let service: LicenseStatusDeploymentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LicenseStatusDeploymentTypeService,
        {
          provide: getRepositoryToken(LicenseStatusDeploymentType),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LicenseStatusDeploymentTypeService>(LicenseStatusDeploymentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
