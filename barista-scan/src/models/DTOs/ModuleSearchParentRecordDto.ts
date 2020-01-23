import { ApiModelProperty } from '@nestjs/swagger';

export class ModuleSearchParentRecordDto {
  @ApiModelProperty()
  entityCount: number;

  @ApiModelProperty()
  entityName: string;

  @ApiModelProperty()
  projectDescription: string;

  @ApiModelProperty()
  projectEmail: string;

  @ApiModelProperty()
  projectGitUrl: string;
  @ApiModelProperty()
  projectId: number;

  @ApiModelProperty()
  projectName: string;

  @ApiModelProperty()
  projectOwner: string;
}
