import { ModuleSearchChildRecordDto } from '@app/models/DTOs/ModuleSearchChildRecordDto';
import { ModuleSearchParentRecordDto } from '@app/models/DTOs/ModuleSearchParentRecordDto';
import { GlobalSearchService } from '@app/services/global-search/global-search.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2Auth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { GetManyDefaultResponse } from '@nestjsx/crud';

@UseGuards(AuthGuard('jwt'))
@ApiOAuth2Auth()
@Controller('global-search')
@ApiUseTags('GlobalSearch')
export class GlobalSearchController {
  constructor(private globalSearchService: GlobalSearchService) {}

  @ApiResponse({
    status: 200,
    type: ModuleSearchParentRecordDto,
    isArray: true,
  })
  @Get('/search-module-1/:modulePartialName/:page/:pageSize')
  async searchForModuleStep1(
    @Param('modulePartialName') modulePartialName: string,
    @Param('page') page: number = 0,
    @Param('pageSize') pageSize: number = 50,
  ): Promise<GetManyDefaultResponse<ModuleSearchParentRecordDto>> {
    return await this.globalSearchService.searchForModule(modulePartialName, page, pageSize);
  }

  @ApiResponse({
    status: 200,
    type: ModuleSearchChildRecordDto,
    isArray: true,
  })
  @Get('/search-module-2/:projectId/:modulePartialName/:page/:pageSize')
  async searchForModuleStep2(
    @Param('projectId') projectId: number,
    @Param('modulePartialName') modulePartialName: string,
    @Param('page') page: number = 0,
    @Param('pageSize') pageSize: number = 50,
  ): Promise<GetManyDefaultResponse<ModuleSearchChildRecordDto>> {
    return await this.globalSearchService.searchForModuleFromProject(projectId, modulePartialName, page, pageSize);
  }
}
