import { ProjectStatusType } from '@app/models/ProjectStatusType';
import { ProjectStatusTypeService } from '@app/services/project-status-type/project-status-type.service';
import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: ProjectStatusType,
  },
})
@ApiUseTags('ProjectStatusType')
@Controller('project-status-type')
export class ProjectStatusTypeController implements CrudController<ProjectStatusType> {
  constructor(public service: ProjectStatusTypeService) {}
}
