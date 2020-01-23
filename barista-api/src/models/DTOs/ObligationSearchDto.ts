import { ApiModelProperty } from '@nestjs/swagger';

export class ObligationSearchDto {
  @ApiModelProperty()
  code: string;
  @ApiModelProperty()
  desc: string;
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  name: string;
}
