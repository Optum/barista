import { Project, User } from '@app/models';
import { LoginDto, UserInfo } from '@app/models/DTOs';
import { AuthJwtToken } from '@app/models/DTOs/AuthJwtToken';
import { ProjectService } from '@app/services/project/project.service';
import { UserService } from '@app/services/user/user.service';
import PaginateArrayResult from '@app/shared/util/paginate-array-result';
import { Body, Controller, Get, Post, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2Auth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor, GetManyDefaultResponse } from '@nestjsx/crud';

@Crud({
  model: {
    type: User,
  },
  routes: {
    exclude: ['getManyBase', 'getOneBase', 'deleteOneBase', 'createManyBase', 'createOneBase', 'updateOneBase'],
  },
})
@ApiUseTags('User')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService, private projectService: ProjectService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOAuth2Auth()
  @Get('projects')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: Project, isArray: true })
  async getManyProjects(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('filterText') filterText: string,
    @Request() request,
  ): Promise<GetManyDefaultResponse<Project> | Project[]> {
    const { id: userId } = request.user;
    let qb = this.projectService.getUsersProjectsQuery(userId);
    if (filterText) {
      qb = qb.andWhere('lower(project.name) like :filter or lower(project.gitUrl) like :filter', {
        filter: `%${filterText.toLowerCase()}%`,
      });
    }

    return await PaginateArrayResult(qb, page, pageSize);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  @ApiResponse({ status: 200, type: UserInfo })
  @ApiOAuth2Auth()
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @ApiResponse({ status: 200, type: AuthJwtToken })
  login(@Body() loginDto: LoginDto, @Request() req) {
    return this.service.login(req.user);
  }
}
