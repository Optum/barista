import { LicenseScanResultItem } from '@app/models';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';

// prettier-ignore
@Crud({
  query: {
    exclude: [
      'rawResults',
      'licenseScan.scan.licenseScanResults',
      'licenseScan.scan.securityScanResults',
    ],
    join: {
      'license': {
        eager: true,
        allow: ['id', 'name'],
      },
      'licenseScan': {
        eager: true,
        allow: ['id', 'scan'],
      },
      'projectScanStatus': {
        eager: true,
        allow: ['code'],
      },
      'licenseScan.scan': {
        eager: true,
        allow: ['id'],
      },
    },
    sort: [
      {
        field: 'path',
        order: 'ASC',
      },
    ],
  },
  model: {
    type: LicenseScanResultItem,
  },
})
@ApiUseTags('LicenseScanResultItem')
@Controller('license-scan-result-item')
export class LicenseScanResultItemController
  implements CrudController<LicenseScanResultItem> {
  constructor(public service: LicenseScanResultItemService) {
  }

  @Get(':id/full-details')
  @UseInterceptors(CrudRequestInterceptor)
  index(@Param('id') id: string): Promise<any> {
    return this.service.db.findOne(id);
  }
}
