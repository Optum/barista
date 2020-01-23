import { ApiModelProperty } from '@nestjs/swagger';

export class LicenseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  modulesCount: number;

  @ApiModelProperty()
  name: string;
}
