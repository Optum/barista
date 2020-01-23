import { DeploymentType } from '@app/models/DeploymentType';
import { DeploymentTypeService } from '@app/services/deployment-type/deployment-type.service';
import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: DeploymentType,
  },
})
@ApiUseTags('DeploymentType')
@Controller('deployment-type')
export class DeploymentTypeController implements CrudController<DeploymentType> {
  constructor(public service: DeploymentTypeService) {}
}
