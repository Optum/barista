import { ObligationType } from '@app/models/ObligationType';
import { ObligationTypeService } from '@app/services/obligation-type/obligation-type.service';
import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: ObligationType,
  },
})
@ApiUseTags('ObligationType')
@Controller('obligation-type')
export class ObligationTypeController implements CrudController<ObligationType> {
  constructor(public service: ObligationTypeService) {}
}
