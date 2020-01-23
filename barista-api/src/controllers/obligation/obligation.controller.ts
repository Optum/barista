import { Obligation } from '@app/models';
import { ObligationSearchDto } from '@app/models/DTOs/ObligationSearchDto';
import { LicenseObligation } from '@app/models/LicenseObligation';
import { LicenseService } from '@app/services/license/license.service';
import { ObligationService } from '@app/services/obligation/obligation.service';
import PaginateArrayResult from '@app/shared/util/paginate-array-result';
import { Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor, GetManyDefaultResponse } from '@nestjsx/crud';

@Crud({
  model: {
    type: Obligation,
  },
})
@ApiUseTags('Obligation')
@Controller('obligation')
export class ObligationController implements CrudController<Obligation> {
  constructor(public service: ObligationService, public licenseService: LicenseService) {}

  @Post('/associate-to-license')
  @UseInterceptors(CrudRequestInterceptor)
  async associateToLicense(@Body() association: LicenseObligation): Promise<boolean> {
    return await this.licenseService.upsertLicenseObligationAssociation(association);
  }

  @Post('/delete-from-license')
  @UseInterceptors(CrudRequestInterceptor)
  async deleteFromLicense(@Body() association: LicenseObligation): Promise<boolean> {
    return await this.licenseService.deleteLicenseObligationAssociation(association);
  }

  @Get('/search')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: ObligationSearchDto, isArray: true })
  async filteredObligations(
    @Query('filterText') filter: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<GetManyDefaultResponse<Obligation>> {
    const query = await this.service.db
      .createQueryBuilder('project')
      .where('lower(name) like :filter or lower("desc") like :filter', {
        filter: '%' + filter.toLocaleLowerCase() + '%',
      });

    return await PaginateArrayResult(query, +page, +pageSize);
  }
}
