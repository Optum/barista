import { SecurityScanResultItem } from '@app/models';
import { SecurityScanResultItemService } from '@app/services/security-scan-result-item/security-scan-result-item.service';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';

// prettier-ignore
@Crud({
  query: {
    exclude: [
      'rawResults',
      'securityScan.scan.licenseScanResults',
      'securityScan.scan.securityScanResults',
    ],
    join: {
      'securityScan': {
        eager: true,
        allow: ['id', 'scan'],
      },
      'securityScan.scan': {
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
    type: SecurityScanResultItem,
  },
})
@ApiUseTags('SecurityScanResultItem')
@Controller('security-scan-result-item')
export class SecurityScanResultItemController
  implements CrudController<SecurityScanResultItem> {
  constructor(public service: SecurityScanResultItemService) {
  }

  /**
   * Retrieves the Full Details, including Raw Results for the supplied Security Scan Result Item Id
   *
   * @param id
   */
  @Get(':id/full-details')
  @UseInterceptors(CrudRequestInterceptor)
  index(@Param('id') id: string): Promise<any> {
    return this.service.db.findOne(id);
  }
}
