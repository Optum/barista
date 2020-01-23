import { Test, TestingModule } from '@nestjs/testing';

import { DeploymentType } from '@app/models/DeploymentType';
import { DeploymentTypeService } from '@app/services/deployment-type/deployment-type.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProjectDevelopmentTypeService', () => {
  let service: DeploymentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeploymentTypeService,
        {
          provide: getRepositoryToken(DeploymentType),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeploymentTypeService>(DeploymentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
