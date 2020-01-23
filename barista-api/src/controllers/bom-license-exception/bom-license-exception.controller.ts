import { BomLicenseException } from '@app/models/BomLicenseException';
import { LogProjectChangeCommand } from '@app/models/commands/LogProjectChangeCommand';
import { BomLicenseExceptionService } from '@app/services/bom-license-exception/bom-license-exception.service';
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
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';

@UseGuards(AuthGuard('jwt'))
@ApiOAuth2Auth()
@Crud({
  model: {
    type: BomLicenseException,
  },
  query: {
    join: {
      project: {
        eager: true,
        exclude: ['createdAt', 'updatedAt'],
        persist: ['id'],
      },
      license: {
        eager: true,
        exclude: ['createdAt', 'updatedAt'],
        persist: ['id'],
      },
      projectScanStatus: {
        eager: true,
        allow: ['code'],
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
@ApiUseTags('BomLicenseException')
@Controller('bom-license-exception')
export class BomLicenseExceptionController implements CrudController<BomLicenseException> {
  constructor(
    public service: BomLicenseExceptionService,
    private commandBus: CommandBus,
    private projectService: ProjectService,
  ) {}

  get base(): CrudController<BomLicenseException> {
    return this;
  }

  @Post('/')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: BomLicenseException })
  async createOneManualLicense(
    @Body() dto: BomLicenseException,
    @ParsedRequest() req: CrudRequest,
    @Request() request: any,
  ): Promise<BomLicenseException> {
    const { id: userId } = request.user;
    dto.userId = userId;
    const exception = await this.service.createOne(req, dto);

    const project = await this.projectService.findOne({ id: dto.project.id });
    await this.commandBus.execute(
      new LogProjectChangeCommand(
        project.id,
        LogProjectChangeCommand.Actions.licenseExceptionCreated,
        `A license exception has been created for project [${project.name}].`,
        userId,
      ),
    );

    return exception;
  }

  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest, @Request() request: any) {
    const id = req.parsed.paramsFilter[0].value;
    const exception = await this.service.findOne({ id });

    const answer = await this.base.deleteOneBase(req);

    const project = await this.projectService.findOne({ id: exception.project.id });
    const { id: userId } = request.user;
    await this.commandBus.execute(
      new LogProjectChangeCommand(
        project.id,
        LogProjectChangeCommand.Actions.licenseExceptionDeleted,
        `A license exception has been deleted from project [${project.name}].`,
        userId,
      ),
    );

    return answer;
  }

  @Get('/search')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: [BomLicenseException] })
  async filteredProjects(
    @Query('projectId') projectId: number,
    @Query('filterText') filter: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<GetManyDefaultResponse<BomLicenseException>> {
    return await this.service.search(projectId, filter, page, pageSize);
  }

  @Override()
  async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: BomLicenseException, @Request() request: any) {
    const exception = await this.base.updateOneBase(req, dto);

    const { id: userId } = request.user;
    dto.userId = userId;
    const project = await this.projectService.findOne({ id: dto.project.id });
    await this.commandBus.execute(
      new LogProjectChangeCommand(
        project.id,
        LogProjectChangeCommand.Actions.licenseExceptionUpdated,
        `A license exception has been updated on project [${project.name}].`,
        userId,
      ),
    );

    return exception;
  }
}
