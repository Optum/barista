import { ApiModelProperty } from '@nestjs/swagger';

export class ProjectDistinctSeverityDto {
  @ApiModelProperty()
  count: number;

  @ApiModelProperty()
  severity: string;
}
