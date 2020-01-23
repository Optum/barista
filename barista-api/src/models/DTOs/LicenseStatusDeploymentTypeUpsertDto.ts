import { ApiModelProperty } from '@nestjs/swagger';

export class LicenseStatusDeploymentTypeUpsertDto {
  @ApiModelProperty()
  deploymentTypeCode: string;

  @ApiModelProperty()
  licenseCode: string;

  @ApiModelProperty()
  licenseFilter: string;

  @ApiModelProperty()
  scanStatusCode: string;
}
