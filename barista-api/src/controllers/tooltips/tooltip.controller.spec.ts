import { Test, TestingModule } from '@nestjs/testing';

import { ToolTipController } from '@app/controllers/tooltips/tooltip.controller';
import { ToolTipService } from '@app/services/tooltips/tooltips.service';
import { AppQueueModule } from '@app/shared/app-queue.module';

describe('ToolTip Controller', () => {
  let controller: ToolTipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppQueueModule],
      controllers: [ToolTipController],
      providers: [
        {
          provide: ToolTipService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ToolTipController>(ToolTipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
