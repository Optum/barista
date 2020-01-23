import { Test, TestingModule } from '@nestjs/testing';

import { OutputFormatTypeService } from '@app/services/output-format-type/output-format-type.service';
import { OutputFormatTypeController } from './output-format-type.controller';

describe('OutputFormatType Controller', () => {
  let controller: OutputFormatTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutputFormatTypeController],
      providers: [
        {
          provide: OutputFormatTypeService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<OutputFormatTypeController>(OutputFormatTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
