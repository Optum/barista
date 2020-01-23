import { Test, TestingModule } from '@nestjs/testing';

import { DeploymentTypeService } from '@app/services/deployment-type/deployment-type.service';
import { DeploymentTypeController } from './deployment-type.controller';

describe('DeploymentModelType Controller', () => {
  let controller: DeploymentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeploymentTypeController],
      providers: [
        {
          provide: DeploymentTypeService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DeploymentTypeController>(DeploymentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
