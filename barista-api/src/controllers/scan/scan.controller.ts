import { LogProjectChangeCommand } from '@app/models/commands/LogProjectChangeCommand';
import { JobInfoDto } from '@app/models/DTOs/JobInfoDto';
import { Scan } from '@app/models/Scan';
import { ProjectService } from '@app/services/project/project.service';
import { ScanService } from '@app/services/scan/scan.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2Auth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { Queue } from 'bull';
import { InjectQueue } from 'nest-bull';

@UseGuards(AuthGuard('jwt'))
@ApiOAuth2Auth()
@Crud({
  query: {
    join: {
      project: {
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
  model: {
    type: Scan,
  },
})
@ApiUseTags('Scan')
@Controller('scan')
export class ScanController implements CrudController<Scan> {
  constructor(
    public service: ScanService,
    public projectService: ProjectService,
    private commandBus: CommandBus,
    @InjectQueue('scan-queue') readonly queue: Queue,
  ) {}

  @Post('/project/:id')
  @UseInterceptors(CrudRequestInterceptor)
  async doScan(@Param('id') id: number, @Request() request: any): Promise<any> {
    const { id: userId } = request.user;
    // Fetch the project by id
    const project = await this.projectService.findOne(id);

    // check if we have a Scan running on this project
    const runningScan = await this.service.tryGetLatestRunningScan(+id);
    if (runningScan) {
      // we have a scan which is already running on given project, prohibit second run
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Project ${project.name} is being scanned. Please try again later.`,
        },
        400,
      );
    }

    // Create the Scan with that project, set the deployment type of the project
    // at the time the scan was run
    const scan = await this.service.db.save({ project, deploymentType: project.deploymentType });

    // Add it to the queue
    const jobInfo = await this.queue.add('default-scan', { scanId: scan.id }, { attempts: 1 });

    await this.service.db.update(
      {
        id: scan.id,
      },
      {
        jobInfo: jobInfo as any,
      },
    );

    const dbScan = await this.service.db.findOne(scan.id);

    await this.commandBus.execute(
      new LogProjectChangeCommand(
        project.id,
        LogProjectChangeCommand.Actions.projectScanInitiated,
        `Scan initiated on project [${project.name}].`,
        userId,
      ),
    );

    return dbScan;
  }

  @Get('/queue/job/:id')
  @UseInterceptors(CrudRequestInterceptor)
  @ApiResponse({ status: 200, type: JobInfoDto })
  async getJobDetails(@Param('id') id: string): Promise<any> {
    return await this.queue.getJob(id);
  }

  @Get('/queue/job/:id/status')
  @UseInterceptors(CrudRequestInterceptor)
  async getJobStatus(@Param('id') id: string): Promise<string> {
    return await (await this.queue.getJob(id)).getState();
  }
}
