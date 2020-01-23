import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from '@app/app.service';
import { License } from '@app/models';
import { LicenseService } from '@app/services/license/license.service';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BullModule, getQueueToken } from 'nest-bull';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.forRoot({
          name: 'test',
          processors: [jest.fn()],
        }),
      ],
      controllers: [AppController],
      providers: [
        AppService,
        LicenseService,
        { provide: getRepositoryToken(License), useClass: mockRepository },
        { provide: getQueueToken('scan-queue'), useValue: { add: jest.fn } },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should instantiate', () => {
      expect(appController).toBeDefined();
    });

    it('should return a result', () => {
      expect(appController.appStatus()).toBeDefined();
    });
  });
});
