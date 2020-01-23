import { Test, TestingModule } from '@nestjs/testing';

import { ProjectService } from '@app/services/project/project.service';
import { ScanService } from '@app/services/scan/scan.service';
import { AppQueueModule } from '@app/shared/app-queue.module';
import { CqrsModule } from '@nestjs/cqrs';
import { getQueueToken } from 'nest-bull';
import { ScanController } from './scan.controller';

describe('Scan Controller', () => {
  let controller: ScanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppQueueModule, CqrsModule],
      controllers: [ScanController],
      providers: [
        {
          provide: ScanService,
          useValue: {},
        },
        {
          provide: ProjectService,
          useValue: {},
        },
        { provide: getQueueToken('scan-queue'), useValue: { add: jest.fn } },
      ],
    }).compile();

    controller = module.get<ScanController>(ScanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
