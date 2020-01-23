import { Test, TestingModule } from '@nestjs/testing';

import { OutputFormatType } from '@app/models';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OutputFormatTypeService } from './output-format-type.service';

describe('OutputFormatTypeService', () => {
  let service: OutputFormatTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OutputFormatTypeService,
        {
          provide: getRepositoryToken(OutputFormatType),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<OutputFormatTypeService>(OutputFormatTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
