import { Test, TestingModule } from '@nestjs/testing';

import { ToolTip } from '@app/models';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ToolTipService', () => {
  let service: ToolTip;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolTip,
        {
          provide: getRepositoryToken(ToolTip),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ToolTip>(ToolTip);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
