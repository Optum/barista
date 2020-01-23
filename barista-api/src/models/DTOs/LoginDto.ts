import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty()
  password: string;
  @ApiModelProperty()
  username: string;
}
