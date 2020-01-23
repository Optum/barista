import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@app/models';
import { jwtConstants } from '@app/services/user/constants';
import { JwtStrategy } from '@app/services/user/jwt.strategy';
import { LdapService } from '@app/services/user/ldap.service';
import { LocalStrategy } from '@app/services/user/local.strategy';
import { mockRepository } from '@app/shared/util/test/Repository.mock';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '3600s' },
        }),
      ],
      providers: [
        LocalStrategy,
        JwtStrategy,
        UserService,
        LdapService,
        { provide: getRepositoryToken(User), useClass: mockRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
