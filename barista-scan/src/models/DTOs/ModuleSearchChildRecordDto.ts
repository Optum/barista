import { ApiModelProperty } from '@nestjs/swagger';

export class ModuleSearchChildRecordDto {
  @ApiModelProperty()
  entityCreationDate: Date;

  @ApiModelProperty()
  entityName: string;

  @ApiModelProperty()
  projectId: number;
}
