import { BomSecurityException, Project } from '@app/models';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import PaginateArrayResult from '@app/shared/util/paginate-array-result';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import * as _ from 'lodash';
import { Brackets } from 'typeorm';

@Injectable()
export class BomSecurityExceptionService extends AppServiceBase<BomSecurityException> {
  constructor(@InjectRepository(BomSecurityException) repo) {
    super(repo);
  }

  async search(
    projectId: number,
    filter: string,
    page: number,
    pageSize: number,
  ): Promise<GetManyDefaultResponse<BomSecurityException>> {
    const query = this.db
      .createQueryBuilder('se')
      .innerJoin('se.project', 'project')
      .andWhere('project.id = :projectId', { projectId })
      .andWhere(
        new Brackets(subQ => {
          subQ
            .where('lower(se.cveId) like :filter', { filter: `%${filter.toLowerCase()}%` })
            .orWhere('lower(se.notes) like :filter', { filter: `%${filter.toLowerCase()}%` })
            .orWhere('lower(se.securityItemPath) like :filter', { filter: `%${filter.toLowerCase()}%` });
        }),
      )
      .select();

    return await PaginateArrayResult(query, page, pageSize);
  }

  async securityExceptionCodes(project: Project) {
    const exceptions = await this.securityExceptionQuery(project.id).getMany();

    return _.map(exceptions, item => {
      return item.projectScanStatus.code;
    });
  }

  securityExceptionQuery(projectId: number) {
    return this.db
      .createQueryBuilder('se')
      .leftJoin('se.project', 'project')
      .leftJoinAndSelect('se.projectScanStatus', 'projectScanStatus')
      .where('project.id = :id', { id: projectId });
  }
}
