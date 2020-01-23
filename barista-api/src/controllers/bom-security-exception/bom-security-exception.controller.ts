import { BomSecurityException } from '@app/models/BomSecurityException';
import { LogProjectChangeCommand } from '@app/models/commands/LogProjectChangeCommand';
import { BomSecurityExceptionService } from '@app/services/bom-security-exception/bom-security-exception.service';
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
    type: BomSecurityException,
  },
  query: {
    join: {
      project: {
        eager: true,
        exclude: ['createdAt', 'updatedAt', 'sortOrder'],
      },
      projectScanStatus: {
        eager: true,
        allow: ['code'],
      },
    },
    exclude: ['createdAt', 'updatedAt'],
  },
})
@ApiUseTags('BomSecurityException')
@Controller('bom-security-exception')
export class BomSecurityExceptionController implements CrudController<BomSecurityException> {
  constructor(
    public service: BomSecurityExceptionService,
    private projectService: ProjectService,
    private commandBus: CommandBus,
  ) {}

  get base(): CrudController<BomSecurityException> {
    return this;
  }

  @Post('/')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: BomSecurityException })
  async createOneSecurityException(
    @Body() dto: BomSecurityException,
    @ParsedRequest() req: CrudRequest,
    @Request() request: any,
  ): Promise<BomSecurityException> {
    const { id: userId } = request.user;
    dto.userId = userId;
    const exception = await this.service.createOne(req, dto);

    const project = await this.projectService.findOne({ id: +dto.project });
    await this.commandBus.execute(
      new LogProjectChangeCommand(
        project.id,
        LogProjectChangeCommand.Actions.securityVulnerabilityExceptionCreated,
        `A security exception has been created for project [${project.name}].`,
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
        LogProjectChangeCommand.Actions.securityVulnerabilityExceptionDeleted,
        `A security exception has been deleted from project [${project.name}].`,
        userId,
      ),
    );

    return answer;
  }

  @Get('/search')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: [BomSecurityException] })
  async search(
    @Query('projectId') projectId: number,
    @Query('filterText') filter: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<GetManyDefaultResponse<BomSecurityException>> {
    return await this.service.search(projectId, filter, page, pageSize);
  }

  @Override()
  async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: BomSecurityException, @Request() request: any) {
    const exception = await this.base.updateOneBase(req, dto);

    const { id: userId } = request.user;
    dto.userId = userId;
    const project = await this.projectService.findOne({ id: dto.project.id });
    await this.commandBus.execute(
      new LogProjectChangeCommand(
        project.id,
        LogProjectChangeCommand.Actions.securityVulnerabilityExceptionUpdated,
        `A security exception has been updated on project [${project.name}].`,
        userId,
      ),
    );

    return exception;
  }
}
