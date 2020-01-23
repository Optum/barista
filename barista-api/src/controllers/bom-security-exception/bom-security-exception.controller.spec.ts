import { Test, TestingModule } from '@nestjs/testing';

import { BomSecurityExceptionController } from '@app/controllers/bom-security-exception/bom-security-exception.controller';
import { BomSecurityExceptionService } from '@app/services/bom-security-exception/bom-security-exception.service';
import { ProjectService } from '@app/services/project/project.service';
import { CqrsModule } from '@nestjs/cqrs';

describe('BomSecurityException Controller', () => {
  let controller: BomSecurityExceptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [BomSecurityExceptionController],
      providers: [
        {
          provide: BomSecurityExceptionService,
          useValue: {},
        },
        {
          provide: ProjectService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BomSecurityExceptionController>(BomSecurityExceptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
