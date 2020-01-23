import { ApiModelProperty } from '@nestjs/swagger';

export class JobInfoDto {
  @ApiModelProperty()
  attemptsMade: number;

  @ApiModelProperty()
  data: {
    scanId?: number;
  };

  @ApiModelProperty()
  delay: number;

  @ApiModelProperty()
  finishedOn: any;

  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  opts: {
    attempts: number;
    delay: number;
    timestamp: number;
  };

  @ApiModelProperty()
  processedOn: any;

  @ApiModelProperty()
  progress: number;

  @ApiModelProperty()
  returnvalue: any;

  @ApiModelProperty()
  stacktrace: any[];

  @ApiModelProperty()
  timestamp: number;
}
