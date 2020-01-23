import { Test, TestingModule } from '@nestjs/testing';

import { PackageManagerService } from '@app/services/package-manager/package-manager.service';
import { PackageManagerController } from './package-manager.controller';

describe('PackageManager Controller', () => {
  let controller: PackageManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageManagerController],
      providers: [
        {
          provide: PackageManagerService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<PackageManagerController>(PackageManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
