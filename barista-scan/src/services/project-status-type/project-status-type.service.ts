import { ProjectStatusType } from '@app/models/ProjectStatusType';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectStatusTypeService extends AppServiceBase<ProjectStatusType> {
  constructor(@InjectRepository(ProjectStatusType) repo) {
    super(repo);
  }
}
