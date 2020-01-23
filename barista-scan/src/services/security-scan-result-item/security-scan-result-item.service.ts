import {
  BomSecurityException,
  Scan,
  SecurityScanResult,
  SecurityScanResultItem,
  SecurityScanResultItemStatusType,
} from '@app/models';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { ProjectScanStatusTypeService } from '@app/services/project-scan-status-type/project-scan-status-type.service';
// tslint:disable-next-line:max-line-length
import { VulnerabilityStatusDeploymentTypeService } from '@app/services/vulnerability-status-deployment-type/vulnerability-status-deployment-type.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { strict as assert } from 'assert';

@Injectable()
export class SecurityScanResultItemService extends AppServiceBase<SecurityScanResultItem> {
  constructor(
    @InjectRepository(SecurityScanResultItem) repo,
    private vulnerabilityStatusDeploymentTypeService: VulnerabilityStatusDeploymentTypeService,
  ) {
    super(repo);
  }

  private logger = new Logger('SecurityScanResultItemService');

  async bomSecurityResultItemQuery(scan: Scan, filter: string) {
    // Logic: where deployment type and securityStatus are in VulnerabilityStatusDeploymentType
    // Also return the projectScanStatus on each result item record.

    let qbMain = SecurityScanResultItem.createQueryBuilder('resultItem')
      .leftJoin('resultItem.securityScan', 'securityScan')
      .leftJoinAndSelect('resultItem.projectScanStatus', 'projectScanStatus')
      .leftJoin('securityScan.scan', 'scan')
      .where('scan.id = :id', { id: scan.id })
      .andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select()
          .from(BomSecurityException, 'bom_se')
          .where('bom_se.project = scan.project')
          .andWhere('bom_se.securityItemPath = resultItem.path')
          .getQuery();
        return `NOT EXISTS ${subQuery}`;
      });

    if (filter) {
      qbMain = qbMain
        .andWhere('lower(resultItem.cveId) like :filter', { filter: `%${filter.toLowerCase()}%` })
        .orWhere('lower(resultItem.path) like :filter', { filter: `%${filter.toLowerCase()}%` });
    }

    return qbMain.select();
  }

  async insertResultItem(
    partial: Partial<SecurityScanResultItem>,
    resultItemStatus: SecurityScanResultItemStatusType,
    securityScanResult: SecurityScanResult,
  ) {
    try {
      assert(securityScanResult.id);

      assert(resultItemStatus);

      assert(securityScanResult.scan.deploymentType);

      const resultItem = this.db.create(partial);

      await resultItem.save();

      let projectScanStatus = await ProjectScanStatusTypeService.Green();

      // Get the scan from the license scan
      // Based on the scan's deploy type...s
      const deploymentType = securityScanResult.scan.deploymentType;

      const vulnerabilityStatusDeploymentType = await this.vulnerabilityStatusDeploymentTypeService.db.findOne({
        where: { securityStatus: resultItemStatus, deploymentType },
      });

      if (vulnerabilityStatusDeploymentType) {
        projectScanStatus = vulnerabilityStatusDeploymentType.projectScanStatus;
      } else {
        // tslint:disable-next-line:max-line-length
        this.logger.debug(
          `*** No VulnerabilityStatusDeploymentType found for [${JSON.stringify(
            resultItemStatus,
            null,
            2,
          )}] + [${JSON.stringify(deploymentType, null, 2)}]`,
        );
      }

      resultItem.projectScanStatus = projectScanStatus;
      resultItem.securityScanResultItemStatus = resultItemStatus;
      resultItem.securityScan = securityScanResult;
      resultItem.save();

      this.logger.log(
        `SAVING securityResultItem.path: ${partial.path}\n \
            securityResultItem.id: ${partial.id}\n \
            SecurityScanResult.id:${securityScanResult.id}\n \
            Scan.id:${securityScanResult.scan.id}`,
      );

      return resultItem;
    } catch (ex) {
      this.logger.error(`insertResultItem:\n${ex}\n \
      ${JSON.stringify(partial, null, 2)}\n \
      ${JSON.stringify(resultItemStatus, null, 2)}`);
    }
  }
}
