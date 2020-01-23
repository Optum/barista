import { ApiModelProperty } from '@nestjs/swagger';

export class ProjectDistinctLicenseDto {
  @ApiModelProperty()
  count: number;

  @ApiModelProperty()
  license: any;
}
