import { BomLicenseException, Project } from '@app/models';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import PaginateArrayResult from '@app/shared/util/paginate-array-result';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import * as _ from 'lodash';

@Injectable()
export class BomLicenseExceptionService extends AppServiceBase<BomLicenseException> {
  constructor(@InjectRepository(BomLicenseException) repo) {
    super(repo);
  }

  async licenseExceptionCodes(project: Project) {
    const exceptions = await this.licenseExceptionQuery(project.id).getMany();

    return _.map(exceptions, item => {
      return item.projectScanStatus.code;
    });
  }

  licenseExceptionQuery(projectId: number) {
    return this.db
      .createQueryBuilder('le')
      .leftJoin('le.project', 'project')
      .leftJoinAndSelect('le.license', 'license')
      .leftJoinAndSelect('le.projectScanStatus', 'projectScanStatus')
      .where('project.id = :id', { id: projectId });
  }

  async search(
    projectId: number,
    filter: string,
    page: number,
    pageSize: number,
  ): Promise<GetManyDefaultResponse<BomLicenseException>> {
    const query = await this.db
      .createQueryBuilder('le')
      .innerJoinAndSelect('le.license', 'license')
      .innerJoin('le.project', 'project')
      .where('project.id = :id', { id: projectId })
      .andWhere('lower(license.code) like :filter', { filter: `${filter.toLowerCase()}%` })
      .orWhere('lower(le.licenseItemPath) like :filter', { filter: `${filter.toLowerCase()}%` })
      .orWhere('lower(le.notes) like :filter', { filter: `${filter.toLowerCase()}%` });

    return await PaginateArrayResult(query, +page, +pageSize);
  }
}
