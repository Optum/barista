import { DeploymentType, License, ProjectScanStatusType } from '@app/models';
import { LicenseStatusDeploymentTypeUpsertDto } from '@app/models/DTOs/LicenseStatusDeploymentTypeUpsertDto';
import { LicenseStatusDeploymentType } from '@app/models/LicenseStatusDeploymentType';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { ProjectScanStatusTypeService } from '@app/services/project-scan-status-type/project-scan-status-type.service';
import PaginateArrayResult from '@app/shared/util/paginate-array-result';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import * as _ from 'lodash';
import * as pit from 'p-iteration';

@Injectable()
export class LicenseStatusDeploymentTypeService extends AppServiceBase<LicenseStatusDeploymentType> {
  private logger = new Logger('LicenseStatusDeploymentTypeService');

  constructor(@InjectRepository(LicenseStatusDeploymentType) repo) {
    super(repo);
  }

  async addToLicenses(data: LicenseStatusDeploymentTypeUpsertDto): Promise<number> {
    const licenses = _.isEmpty(data.licenseFilter)
      ? await License.createQueryBuilder().getMany()
      : await License.createQueryBuilder()
          .where('lower(name) like :filter or lower(code) like :filter', {
            filter: '%' + data.licenseFilter.toLocaleLowerCase() + '%',
          })
          .getMany();
    let cnt = 0;
    await pit.forEach(licenses, async license => {
      if (
        await this.upsert({
          licenseCode: license.code,
          deploymentTypeCode: data.deploymentTypeCode,
          scanStatusCode: data.scanStatusCode,
        } as LicenseStatusDeploymentTypeUpsertDto)
      ) {
        cnt++;
      }
    });

    return cnt;
  }

  async delete(data: LicenseStatusDeploymentTypeUpsertDto): Promise<boolean> {
    const result = await this.db.findOneOrFail({
      where: {
        license: { code: data.licenseCode } as License,
        deploymentType: { code: data.deploymentTypeCode } as DeploymentType,
        projectScanStatus: { code: data.scanStatusCode } as ProjectScanStatusType,
      },
    });

    if (result) {
      await this.db.remove(result);
      return true;
    }

    return false;
  }

  async deleteFromLicenses(data: LicenseStatusDeploymentTypeUpsertDto): Promise<number> {
    const licenses = _.isEmpty(data.licenseFilter)
      ? await License.createQueryBuilder().getMany()
      : await License.createQueryBuilder()
          .where('lower(name) like :filter or lower(code) like :filter', {
            filter: '%' + data.licenseFilter.toLocaleLowerCase() + '%',
          })
          .getMany();
    let cnt = 0;
    await pit.forEach(licenses, async license => {
      if (
        await this.delete({
          licenseCode: license.code,
          deploymentTypeCode: data.deploymentTypeCode,
          scanStatusCode: data.scanStatusCode,
        } as LicenseStatusDeploymentTypeUpsertDto)
      ) {
        cnt++;
      }
    });

    return cnt;
  }

  async getExceptionsForLicense(
    licenseCode: string,
    page: number,
    pageSize: number,
  ): Promise<GetManyDefaultResponse<LicenseStatusDeploymentType>> {
    const query = await this.db.createQueryBuilder('lstp').where('lstp.license_code = :licenseCode', {
      licenseCode,
    });

    return await PaginateArrayResult(query, +page, +pageSize);
  }

  async licenseStatus(license: License, deploymentType: DeploymentType) {
    let projectScanStatus = await ProjectScanStatusTypeService.Green();

    const licenseStatusDeploymentType = await this.db.findOne({
      where: { license, deploymentType },
    });

    if (licenseStatusDeploymentType) {
      projectScanStatus = licenseStatusDeploymentType.projectScanStatus;
    }

    return projectScanStatus;
  }

  async upsert(data: LicenseStatusDeploymentTypeUpsertDto): Promise<boolean> {
    const result = await this.db.findOne({
      where: {
        license: { code: data.licenseCode } as License,
        deploymentType: { code: data.deploymentTypeCode } as DeploymentType,
        projectScanStatus: { code: data.scanStatusCode } as ProjectScanStatusType,
      },
    });

    if (!result) {
      await this.db.insert({
        license: {
          code: data.licenseCode,
        } as License,
        deploymentType: {
          code: data.deploymentTypeCode,
        } as DeploymentType,
        projectScanStatus: {
          code: data.scanStatusCode,
        } as ProjectScanStatusType,
      });

      return true;
    }

    return false;
  }
}
