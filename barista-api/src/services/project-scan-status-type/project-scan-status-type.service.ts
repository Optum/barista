import { ProjectScanStatusType } from '@app/models/ProjectScanStatusType';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectScanStatusTypeService extends AppServiceBase<ProjectScanStatusType> {
  constructor(@InjectRepository(ProjectScanStatusType) repo) {
    super(repo);
  }

  static async Green() {
    return await ProjectScanStatusType.findOne('green');
  }

  static async Red() {
    return await ProjectScanStatusType.findOne('red');
  }

  static async Unknown() {
    return await ProjectScanStatusType.findOne('unknown');
  }

  static async Yellow() {
    return await ProjectScanStatusType.findOne('yellow');
  }
}
