import { Test, TestingModule } from '@nestjs/testing';
// tslint:disable-next-line:ordered-imports
import { ProjectService } from '@app/services/project/project.service';
import { UserService } from '@app/services/user/user.service';
import { UserController } from './user.controller';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: ProjectService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
