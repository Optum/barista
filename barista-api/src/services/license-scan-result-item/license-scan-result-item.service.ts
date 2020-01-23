import { BomLicenseException, License, LicenseScanResult, LicenseScanResultItem, Scan } from '@app/models';
import { LicenseDto } from '@app/models/DTOs/LicenseDto';
import { LicenseModuleDto } from '@app/models/DTOs/LicenseModuleDto';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { LicenseStatusDeploymentTypeService } from '@app/services/license-status-deployment-type/license-status-deployment-type.service';
import { PaginateRawQuery } from '@app/shared/util/paginate-array-result';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import { strict as assert } from 'assert';
import { getManager } from 'typeorm';

@Injectable()
export class LicenseScanResultItemService extends AppServiceBase<LicenseScanResultItem> {
  private logger = new Logger('LicenseScanResultItemService');

  constructor(
    @InjectRepository(LicenseScanResultItem) repo,
    private licenseStatusDeploymentTypeService: LicenseStatusDeploymentTypeService,
  ) {
    super(repo);
  }

  async bomLicenseResultItemQuery(scan: Scan, filter: string) {
    // TODO: Make sure that scan.project.deploymentType.code is fully fetched

    // TODO: Update to exclude results where an exception has been given
    let qbMain = LicenseScanResultItem.createQueryBuilder('resultItem')
      .leftJoin('resultItem.licenseScan', 'licenseScan')
      .leftJoinAndSelect('resultItem.projectScanStatus', 'projectScanStatus')
      .leftJoinAndSelect('resultItem.license', 'license')
      .leftJoin('licenseScan.scan', 'scan')
      .where('scan.id = :id', { id: scan.id })
      .andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select()
          .from(BomLicenseException, 'bom_le')
          .where('bom_le.project = scan.project')
          .andWhere('bom_le.licenseItemPath = resultItem.displayIdentifier')
          .getQuery();
        return `NOT EXISTS ${subQuery}`;
      });

    if (filter) {
      qbMain = qbMain
        .andWhere('lower(license.name) like :filter', { filter: `${filter.toLowerCase()}%` })
        .orWhere('lower(resultItem.displayIdentifier) like :filter', { filter: `${filter.toLowerCase()}%` });
    }

    return qbMain.select();
  }

  async bomLicensesOnly(
    projectId: number,
    page: number,
    pageSize: number,
    filter: string,
  ): Promise<GetManyDefaultResponse<LicenseDto>> {
    const query = `
          select l.id, l.name, subQ.modulesCount
      from license l,
           (
               select lsri."licenseId", count(*) as modulesCount
               from license_scan_result lsr,
                    license_scan_result_item lsri
               where lsr.id = lsri."licenseScanId"
                 and lsr."scanId" =
                     (select id from scan where "projectId" = $1 and completed_at is not null order by id desc limit 1)
                 and lsri."displayIdentifier" not in
                     (select "licenseItemPath" from bom_license_exception where "projectId" = $1)
               group by lsri."licenseId") subQ
      where l.id = subQ."licenseId"
      and lower(l.name) like $2
      order by l.name`;

    return await PaginateRawQuery<LicenseDto>(
      getManager(),
      query,
      [projectId, '%' + (filter || '').toLowerCase() + '%'],
      page,
      pageSize,
      row =>
        ({
          id: row.id,
          name: row.name,
          modulesCount: row.modulescount,
        } as LicenseDto),
    );
  }

  async bomModulesFromLicense(
    projectId: number,
    licenseId: number,
    page: number,
    pageSize: number,
    filter: string,
  ): Promise<GetManyDefaultResponse<LicenseModuleDto>> {
    const query = `
          select lsri."displayIdentifier", lsri."publisherEmail", lsri."publisherName", lsri."publisherUrl", psst.code,
                  lsri.id
      from license_scan_result lsr,
           license_scan_result_item lsri
               left join project_scan_status_type psst on lsri.project_scan_status_type_code = psst.code
      where lsr.id = lsri."licenseScanId"
        and lsr."scanId" =
            (select id from scan where "projectId" = $1 and completed_at is not null order by id desc limit 1)
        and lsri."displayIdentifier" not in (select "licenseItemPath" from bom_license_exception where "projectId" = $1)
        and lsri."licenseId" = $2
        and lower(lsri."displayIdentifier") like $3
      order by lsri."displayIdentifier"`;

    return await PaginateRawQuery<LicenseModuleDto>(
      getManager(),
      query,
      [projectId, licenseId, '%' + (filter || '').toLowerCase() + '%'],
      page,
      pageSize,
      row =>
        ({
          licenseScanResultItemId: row.id,
          modulePath: row.displayIdentifier,
          publisherEmail: row.publisherEmail,
          publisherName: row.publisherName,
          publisherUrl: row.publisherUrl,
          scanCode: row.code,
        } as LicenseModuleDto),
    );
  }

  async insertResultItem(
    partial: Partial<LicenseScanResultItem>,
    license: License,
    licenseScanResult: LicenseScanResult,
  ) {
    try {
      assert(licenseScanResult.id);

      assert(license);

      assert(licenseScanResult.scan.deploymentType);

      const resultItem = this.db.create(partial);

      await resultItem.save();

      const projectScanStatus = await this.licenseStatusDeploymentTypeService.licenseStatus(
        license,
        licenseScanResult.scan.deploymentType,
      );

      resultItem.projectScanStatus = projectScanStatus;
      resultItem.license = license;
      resultItem.licenseScan = licenseScanResult;
      await resultItem.save();

      this.logger.log(
        `SAVING licenseResultItem.path: ${resultItem.path}\n \
            licenseResultItem.id: ${resultItem.id}\n \
            LicenseScanResult.id:${licenseScanResult.id}\n \
            Scan.id:${licenseScanResult.scan.id}`,
      );

      return resultItem;
    } catch (ex) {
      this.logger.error(`insertResultItem:\n${ex}\n \
      ${JSON.stringify(partial, null, 2)}\n \
      ${JSON.stringify(license, null, 2)}`);
    }
  }
}
