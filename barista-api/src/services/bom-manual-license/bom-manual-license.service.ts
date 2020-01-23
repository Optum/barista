import { BomManualLicense, Project } from '@app/models';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { LicenseStatusDeploymentTypeService } from '@app/services/license-status-deployment-type/license-status-deployment-type.service';
import PaginateArrayResult from '@app/shared/util/paginate-array-result';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import * as _ from 'lodash';
import { Brackets } from 'typeorm';

@Injectable()
export class BomManualLicenseService extends AppServiceBase<BomManualLicense> {
  constructor(
    private licenseStatusDeploymentTypeService: LicenseStatusDeploymentTypeService,
    @InjectRepository(BomManualLicense) repo,
  ) {
    super(repo);
  }

  async manualLicenseCodes(project: Project) {
    const manualLicenses = await this.manualLicenseQuery(project.id).getMany();

    return await Promise.all(
      _.map(manualLicenses, async item => {
        const status = await this.licenseStatusDeploymentTypeService.licenseStatus(
          item.license,
          project.deploymentType,
        );
        return status.code;
      }),
    );
  }

  async manualLicenseCount(project: Project) {
    return await this.manualLicenseQuery(project.id).getCount();
  }

  manualLicenseQuery(projectId: number) {
    return this.db
      .createQueryBuilder('manualLicense')
      .leftJoin('manualLicense.project', 'project')
      .leftJoinAndSelect('manualLicense.license', 'license')
      .where('project.id = :id', { id: projectId });
  }

  async search(
    projectId: number,
    filter: string,
    page: number,
    pageSize: number,
  ): Promise<GetManyDefaultResponse<BomManualLicense>> {
    const query = this.db
      .createQueryBuilder('ml')
      .innerJoin('ml.project', 'project')
      .andWhere('project.id = :projectId', { projectId })
      .andWhere(
        new Brackets(subQ => {
          subQ
            .where('lower(ml.productName) like :filter', { filter: `%${filter.toLowerCase()}%` })
            .orWhere('lower(ml.referenceUrl) like :filter', { filter: `%${filter.toLowerCase()}%` })
            .orWhere('lower(ml.productVersion) like :filter', { filter: `%${filter.toLowerCase()}%` });
        }),
      )
      .select();

    return await PaginateArrayResult(query, page, pageSize);
  }
}
