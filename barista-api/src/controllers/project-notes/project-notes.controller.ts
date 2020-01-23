import { ProjectNote } from '@app/models';
import { ProjectNotesService } from '@app/services/project-notes/project-notes.service';
import { Body, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2Auth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';

@UseGuards(AuthGuard('jwt'))
@ApiOAuth2Auth()
@Crud({
  model: {
    type: ProjectNote,
  },
  query: {
    join: {
      project: {
        eager: true,
        exclude: ['createdAt', 'updatedAt', 'securityExceptions'],
        persist: ['id'],
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
@ApiUseTags('ProjectNotes')
@Controller('project-notes')
export class ProjectNotesController implements CrudController<ProjectNote> {
  constructor(public service: ProjectNotesService) {}

  get base(): CrudController<ProjectNote> {
    return this;
  }

  @Post('/')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: ProjectNote })
  createOneProjectNote(
    @Body() dto: ProjectNote,
    @ParsedRequest() req: CrudRequest,
    @Request() request: any,
  ): Promise<ProjectNote> {
    const { id } = request.user;
    dto.userId = id;
    return this.service.createOne(req, dto);
  }
}
