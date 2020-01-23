import { LicenseScanResult } from '@app/models';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

// prettier-ignore
@Crud({
  model: {
    type: LicenseScanResult,
  },
  query: {
    join: {
      'scan': {
        eager: true,
      },
      'licenseScanResultItems': {
        eager: true,
      },
      'licenseScanResultItems.license': {
        eager: true,
      },
    },
  },
})
@ApiUseTags('LicenseScanResult')
@Controller('license-scan-result')
export class LicenseScanResultController
  implements CrudController<LicenseScanResult> {
  constructor(public service: LicenseScanResultService) {}
}
