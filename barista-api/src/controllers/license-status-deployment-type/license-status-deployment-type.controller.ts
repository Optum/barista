import { LicenseStatusDeploymentTypeUpsertDto } from '@app/models/DTOs/LicenseStatusDeploymentTypeUpsertDto';
import { LicenseStatusDeploymentType } from '@app/models/LicenseStatusDeploymentType';
import { LicenseStatusDeploymentTypeService } from '@app/services/license-status-deployment-type/license-status-deployment-type.service';
import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2Auth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor, GetManyDefaultResponse } from '@nestjsx/crud';

@UseGuards(AuthGuard('jwt'))
@ApiOAuth2Auth()
@Crud({
  query: {
    join: {
      deploymentType: {
        eager: true,
        allow: ['code', 'description'],
      },
      projectScanStatus: {
        eager: true,
        allow: ['code', 'description'],
      },
      license: {
        eager: true,
        allow: ['id', 'code', 'name'],
      },
    },
    allow: ['id'],
  },
  model: {
    type: LicenseStatusDeploymentType,
  },
})
@ApiUseTags('LicenseStatusDeploymentType')
@Controller('license-status-deployment-type')
export class LicenseStatusDeploymentTypeController implements CrudController<LicenseStatusDeploymentType> {
  constructor(public service: LicenseStatusDeploymentTypeService) {}

  @Post('/add-to-licenses')
  @UseInterceptors(CrudRequestInterceptor)
  async addToLicenses(@Body() data: LicenseStatusDeploymentTypeUpsertDto): Promise<number> {
    return await this.service.addToLicenses(data);
  }

  @Post('/delete')
  @UseInterceptors(CrudRequestInterceptor)
  async deleteByLicenseCode(@Body() data: LicenseStatusDeploymentTypeUpsertDto): Promise<boolean> {
    return await this.service.delete(data);
  }

  @Post('/delete-from-licenses')
  @UseInterceptors(CrudRequestInterceptor)
  async deleteFromLicenses(@Body() data: LicenseStatusDeploymentTypeUpsertDto): Promise<number> {
    return await this.service.deleteFromLicenses(data);
  }

  @Get('/get-exceptions-for-license')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, isArray: true, type: LicenseStatusDeploymentType })
  async getExceptionsForLicense(
    @Query('licenseCode') licenseCode: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ): Promise<GetManyDefaultResponse<LicenseStatusDeploymentType>> {
    return await this.service.getExceptionsForLicense(licenseCode, page, perPage);
  }

  @Post('/upsert')
  @UseInterceptors(CrudRequestInterceptor)
  async upsert(@Body() data: LicenseStatusDeploymentTypeUpsertDto): Promise<boolean> {
    return await this.service.upsert(data);
  }
}
