import { ApiModelProperty } from '@nestjs/swagger';

export class AppStatus {
  @ApiModelProperty()
  appCommitHash: string;

  @ApiModelProperty()
  appEnvironment: string;

  @ApiModelProperty()
  appMetaData?: any;

  @ApiModelProperty()
  appName: string;

  @ApiModelProperty()
  appVersion: string;

  @ApiModelProperty()
  nodeEnv?: string;
}
