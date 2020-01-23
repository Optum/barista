import { ProjectDevelopmentType } from '@app/models';
import { DeploymentType } from '@app/models/DeploymentType';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectDevelopmentTypeService extends AppServiceBase<DeploymentType> {
  constructor(@InjectRepository(ProjectDevelopmentType) repo) {
    super(repo);
  }
}
