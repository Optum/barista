import { SecurityScanResultItemStatusType } from '@app/models/SecurityScanResultItemStatusType';
// tslint:disable-next-line:max-line-length
import { SecurityScanResultItemStatusTypeService } from '@app/services/security-scan-result-item-status-type/security-scan-result-item-status-type.service';
import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: SecurityScanResultItemStatusType,
  },
})
@ApiUseTags('SecurityScanResultItemStatusType')
@Controller('security-scan-result-item-status-type')
export class SecurityScanResultItemStatusTypeController implements CrudController<SecurityScanResultItemStatusType> {
  constructor(public service: SecurityScanResultItemStatusTypeService) {}
}
