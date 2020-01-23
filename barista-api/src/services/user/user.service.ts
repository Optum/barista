import { User } from '@app/models';
import { UserInfo } from '@app/models/DTOs';
import { AuthJwtToken } from '@app/models/DTOs/AuthJwtToken';
import { UserRole } from '@app/models/User';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService extends AppServiceBase<User> {
  constructor(@InjectRepository(User) repo, private readonly jwtService: JwtService) {
    super(repo);
  }

  logger = new Logger('UserService');

  async findOneLocal(userName: string): Promise<User> {
    const user = await User.findOne({ where: { userName } });
    const isLocal = true;
    if (!user) {
      // query here the AD
    }

    if (user) {
      user.isLocal = isLocal;
    }

    return user;
  }

  // TODO: Might there be an opportunity to make this a stronger type? Something like Partial<User>?
  async login(user: any): Promise<AuthJwtToken> {
    const payload = { sub: user.id, ...user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(userName: string, pass: string): Promise<UserInfo> {
    const user = await this.findOneLocal(userName);
    if (user) {
      if (user.isLocal) {
        if (await bcrypt.compare(pass, user.passwordHash)) {
          const { passwordHash, isLocal, createdAt, updatedAt, ...result } = user;
          return {
            displayName: result.displayName,
            role: UserRole[result.role],
            userName: result.userName,
            id: result.id,
            email: 'email@localhost',
            groups: ['group1', 'group2', 'group3'],
          };
        }
      }
    }

    return null;
  }
}
