import { ApiModelProperty } from '@nestjs/swagger';

export class AuthJwtToken {
  @ApiModelProperty()
  accessToken: string;
}
