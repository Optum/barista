import { ApiModelProperty } from '@nestjs/swagger';

export class EntityCodeAndRelationFilterDto {
  @ApiModelProperty()
  code: string;

  @ApiModelProperty()
  filter: string;
}
