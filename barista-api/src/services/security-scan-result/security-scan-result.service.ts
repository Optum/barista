import { Scan, SecurityScanResult, SecurityScanResultItem } from '@app/models';
import { ProjectDistinctVulnerabilityDto } from '@app/models/DTOs';
import { ProjectDistinctSeverityDto } from '@app/models/DTOs/ProjectDistinctSeverityDto';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SecurityScanResultService extends AppServiceBase<SecurityScanResult> {
  constructor(@InjectRepository(SecurityScanResult) repo) {
    super(repo);
  }

  /**
   * Gets distinct vulnerabilities from a SecurityScanResult
   */
  async distinctSeverities(securityScan: SecurityScanResult): Promise<ProjectDistinctSeverityDto[]> {
    return (await SecurityScanResultItem.createQueryBuilder('ri')
      .addGroupBy('upper(ri.severity)')
      .addOrderBy('count(*)', 'DESC')
      .where('ri."securityScanId" = :id', { id: securityScan.id })
      .select('upper(ri.severity) as severity')
      .addSelect('count(*) as count')
      .getRawMany())
      .map(row => ({
        count: +row.count,
        severity: row.severity,
      }))
      .map(row => ({
        count: +row.count,
        severity: row.severity,
      }))
      .sort((a, b) => {
        const serverityA = a.severity.toUpperCase();
        const severityB = b.severity.toUpperCase();
        const sorting = ['0.0', 'UNKNOWN', 'LOW', 'MODERATE', 'MEDIUM', 'HIGH', 'CRITICAL'];

        if (sorting.indexOf(serverityA) < sorting.indexOf(severityB)) {
          return 1;
        }
        if (sorting.indexOf(serverityA) > sorting.indexOf(severityB)) {
          return -1;
        }

        return 0;
      });
  }

  /**
   * Gets distinct vulnerabilities from a SecurityScanResult
   */
  async distinctVulnerabilities(securityScan: SecurityScanResult): Promise<ProjectDistinctVulnerabilityDto[]> {
    return (await SecurityScanResultItem.createQueryBuilder('ri')
      .addGroupBy('lower(ri.path)')
      .addOrderBy('count(*)', 'DESC')
      .where('ri."securityScanId" = :id', { id: securityScan.id })
      .select('lower(ri.path) as path')
      .addSelect('count(*) as count')
      .getRawMany()).map(row => ({
      count: +row.count,
      path: row.path,
    }));
  }

  async insertResult(partial: Partial<SecurityScanResult>, scan: Scan) {
    const result = await this.db.create(partial);
    await result.save();
    result.scan = scan;
    await result.save();

    return result;
  }
}
