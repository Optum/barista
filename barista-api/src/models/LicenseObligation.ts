import { ApiModelProperty } from '@nestjs/swagger';

export class LicenseObligation {
  @ApiModelProperty()
  licenseCode: string;

  @ApiModelProperty()
  obligationCode: string;
}
