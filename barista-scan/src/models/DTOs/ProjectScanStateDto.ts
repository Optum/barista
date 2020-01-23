import { ProjectScanStatusType } from '@app/models';
import { ApiModelProperty } from '@nestjs/swagger';

export class ProjectScanStateDto {
  @ApiModelProperty({ type: type => ProjectScanStatusType })
  licenseStatus: ProjectScanStatusType;

  @ApiModelProperty()
  projectId: number;

  @ApiModelProperty({ type: type => ProjectScanStatusType })
  securityStatus: ProjectScanStatusType;
}
