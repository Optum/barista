import { BomManualLicense } from '@app/models/BomManualLicense';
import { LogProjectChangeCommand } from '@app/models/commands/LogProjectChangeCommand';
import { BomManualLicenseService } from '@app/services/bom-manual-license/bom-manual-license.service';
import { LicenseStatusDeploymentTypeService } from '@app/services/license-status-deployment-type/license-status-deployment-type.service';
import { ProjectService } from '@app/services/project/project.service';
import { Body, Controller, Get, Post, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2Auth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  GetManyDefaultResponse,
  ParsedRequest,
} from '@nestjsx/crud';
import { strict as assert } from 'assert';
import * as pit from 'p-iteration';

// tslint:disable:object-literal-key-quotes
@UseGuards(AuthGuard('jwt'))
@ApiOAuth2Auth()
@Crud({
  model: {
    type: BomManualLicense,
  },
  query: {
    join: {
      project: {
        eager: true,
        persist: ['id'],
      },
      'project.deploymentType': {
        eager: true,
        persist: ['code'],
      },
      license: {
        eager: true,
      },
    },
    sort: [
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
  },
  routes: {
    exclude: ['createOneBase'],
  },
})
// tslint:enable:object-literal-key-quotes

@ApiUseTags('BomManualLicense')
@Controller('bom-manual-license')
export class BomManualLicenseController implements CrudController<BomManualLicense> {
  constructor(
    public service: BomManualLicenseService,
    private licenseStatusDeploymentTypeService: LicenseStatusDeploymentTypeService,
    private commandBus: CommandBus,
    private projectService: ProjectService,
  ) {}

  get base(): CrudController<BomManualLicense> {
    return this;
  }

  @Post('/')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: BomManualLicense })
  async createOneManualLicense(
    @Body() dto: BomManualLicense,
    @ParsedRequest() req: CrudRequest,
    @Request() request: any,
  ): Promise<BomManualLicense> {
    const { id: userId } = request.user;
    dto.userId = userId;
    const dbProject = await this.projectService.findOne({ id: dto.project.id });
    await this.commandBus.execute(
      new LogProjectChangeCommand(
        dto.project.id,
        LogProjectChangeCommand.Actions.manualLicenseCreated,
        `A manual license has been created for the project [${dbProject.name}].`,
        userId,
      ),
    );
    return this.service.createOne(req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOAuth2Auth()
  @Get()
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: BomManualLicense, isArray: true })
  async getManyBomManualLicenses(
    @ParsedRequest() req: CrudRequest,
    @Request() request,
  ): Promise<GetManyDefaultResponse<BomManualLicense> | BomManualLicense[]> {
    const addStatus = async (items: BomManualLicense[]) => {
      const dtos: BomManualLicense[] = [];

      await pit.forEachSeries(items, async item => {
        assert(item.license);
        assert(item.project);
        assert(item.project.deploymentType);

        item.projectScanStatus = await this.licenseStatusDeploymentTypeService.licenseStatus(
          item.license,
          item.project.deploymentType,
        );

        dtos.push(item);
      });

      return dtos;
    };

    const { parsed, options } = req;
    const builder = await this.service.createBuilder(parsed, options);

    if (this.service.decidePagination(parsed, options)) {
      const [data, total] = await builder.getManyAndCount();
      const limit = builder.expressionMap.take;
      const offset = builder.expressionMap.skip;

      const paginated = await addStatus(data);

      return this.service.createPageInfo(paginated, total, limit, offset);
    }

    const result = await builder.getMany();

    const updated = await addStatus(result);

    return Promise.resolve(updated);
  }

  @Get('/search')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: [BomManualLicense] })
  async search(
    @Query('projectId') projectId: number,
    @Query('filterText') filter: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<GetManyDefaultResponse<BomManualLicense>> {
    return await this.service.search(projectId, filter, page, pageSize);
  }
}
