import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  password: string;
  @ApiProperty()
  username: string;
}
