import { Test, TestingModule } from '@nestjs/testing';

import { SystemConfiguration } from '@app/models';
import { SystemConfigurationService } from '@app/services/system-configuration/system-configuration.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SystemConfigurationService', () => {
  let service: SystemConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemConfigurationService,
        {
          provide: getRepositoryToken(SystemConfiguration),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SystemConfigurationService>(SystemConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
