import { ApiModelProperty } from '@nestjs/swagger';

export class LicenseModuleDto {
  @ApiModelProperty()
  licenseScanResultItemId: number;

  @ApiModelProperty()
  modulePath: string;

  @ApiModelProperty()
  publisherEmail: string;

  @ApiModelProperty()
  publisherName: string;

  @ApiModelProperty()
  publisherUrl: string;

  @ApiModelProperty()
  scanCode: string;
}
