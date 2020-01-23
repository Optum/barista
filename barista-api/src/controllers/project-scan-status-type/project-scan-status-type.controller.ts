import { ProjectScanStatusType } from '@app/models/ProjectScanStatusType';
import { ProjectScanStatusTypeService } from '@app/services/project-scan-status-type/project-scan-status-type.service';
import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: ProjectScanStatusType,
  },
})
@ApiUseTags('ProjectScanStatusType')
@Controller('project-scan-status-type')
export class ProjectScanStatusTypeController implements CrudController<ProjectScanStatusType> {
  constructor(public service: ProjectScanStatusTypeService) {}
}
