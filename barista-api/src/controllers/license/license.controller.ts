import { EntityCodeAndRelationFilterDto } from '@app/models/DTOs/EntityCodeAndRelationFilterDto';
import { ObligationSearchDto } from '@app/models/DTOs/ObligationSearchDto';
import { License } from '@app/models/License';
import { LicenseService } from '@app/services/license/license.service';
import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2Auth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor, GetManyDefaultResponse } from '@nestjsx/crud';

@UseGuards(AuthGuard('jwt'))
@ApiOAuth2Auth()
@Crud({
  model: {
    type: License,
  },
  query: {
    sort: [
      {
        field: 'name',
        order: 'ASC',
      },
    ],
  },
})
@ApiUseTags('License')
@Controller('license')
export class LicenseController implements CrudController<License> {
  constructor(public service: LicenseService) {}

  @Post('/associate-obligation-to-licences-by-filter')
  @UseInterceptors(CrudRequestInterceptor)
  async associateObligationToLicencesByFilter(@Body() request: EntityCodeAndRelationFilterDto): Promise<number> {
    return await this.service.associateObligationToLicensesByFilter(request.code, request.filter);
  }

  @Post('/delete-obligation-from-licences-by-filter')
  @UseInterceptors(CrudRequestInterceptor)
  async deleteObligationFromLicencesByFilter(@Body() request: EntityCodeAndRelationFilterDto): Promise<number> {
    return await this.service.deleteObligationFromLicensesByFilter(request.code, request.filter);
  }

  @Get('/search')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: License, isArray: true })
  async filteredLicense(
    @Query('filterText') filter: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<GetManyDefaultResponse<License>> {
    return await this.service.search(filter, page, pageSize);
  }

  /**
   * Returns the associated obligations
   */
  @Get('/obligations')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: ObligationSearchDto, isArray: true })
  async getAssociatedObligations(
    @Query('licenseCode') licenseCode: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ): Promise<any> {
    return await this.service.associatedObligations(licenseCode, +page, +perPage);
  }
}
