import { Test, TestingModule } from '@nestjs/testing';

import { ObligationTypeService } from '@app/services/obligation-type/obligation-type.service';
import { ObligationTypeController } from './obligation-type.controller';

describe('ObligationType Controller', () => {
  let controller: ObligationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObligationTypeController],
      providers: [
        {
          provide: ObligationTypeService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ObligationTypeController>(ObligationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
