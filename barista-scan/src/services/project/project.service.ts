import { Obligation, ProjectScanStatusType, Scan, SystemConfiguration } from '@app/models';
import { ProjectDistinctLicenseDto, ProjectDistinctVulnerabilityDto } from '@app/models/DTOs';
import { ObligationSearchDto } from '@app/models/DTOs/ObligationSearchDto';
import { ProjectDistinctSeverityDto } from '@app/models/DTOs/ProjectDistinctSeverityDto';
import { Project } from '@app/models/Project';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { BomManualLicenseService } from '@app/services/bom-manual-license/bom-manual-license.service';
import { ProjectScanStatusTypeService } from '@app/services/project-scan-status-type/project-scan-status-type.service';
import { ScanService } from '@app/services/scan/scan.service';
import { PaginateRawQuery } from '@app/shared/util/paginate-array-result';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import { SelectQueryBuilder } from 'typeorm';
import * as url from 'url';

@Injectable()
export class ProjectService extends AppServiceBase<Project> {
  constructor(
    @Inject(forwardRef(() => ScanService))
    private readonly scanService: ScanService,
    @Inject(forwardRef(() => BomManualLicenseService))
    private readonly bomManualLicenseService: BomManualLicenseService,
    @InjectRepository(Project) repo,
  ) {
    super(repo);
  }

  /**
   * Gets distinct licenses from the latest Scan of a Project
   */
  async distinctLicenses(project: Project): Promise<ProjectDistinctLicenseDto[]> {
    const query = `
            select l.name, count(*)
            from license l,
                 (
                     select lsri."licenseId" as licenseId
                     from license_scan_result_item lsri,
                          license_scan_result lsr,
                          scan s
                     where lsri."licenseScanId" = lsr.id
                       and lsr."scanId" = s.id
                       and s.id = (select s2.id
                                   from scan s2
                                   where s2."projectId" = $1
                                   order by s2.completed_at desc
                                   limit 1)
                       and lsr.id = (select lsr2.id
                                     from license_scan_result lsr2
                                     where lsr2."scanId" = (select s2.id
                                                            from scan s2
                                                            where s2."projectId" = $1
                                                            order by s2.completed_at desc
                                                            limit 1)
                                     order by s.completed_at desc
                                     limit 1)
                     union all
                     select bml."licenseId" as licenseId
                     from bom_manual_license bml
                     where bml."projectId" = $1) t
            where l.id = t.licenseId
            group by l.id`;
    const rows = await this.db.manager.query(query, [project.id]);
    return rows.map(row => ({
      license: {
        name: row.name,
      },
      count: row.count,
    }));
  }

  /**
   * Gets distinct obligations from the latest Scan of a Project
   */
  async distinctObligations(project: Project): Promise<Obligation[]> {
    const scan = await this.latestCompletedScan(project);

    if (scan) {
      return this.scanService.distinctObligations(scan);
    } else {
      return [];
    }
  }

  /**
   * Gets distinct vulnerabilities from the latest Scan of a Project
   */
  async distinctSeverities(project: Project): Promise<ProjectDistinctSeverityDto[]> {
    const scan = await this.latestCompletedScan(project);

    if (scan) {
      return this.scanService.distinctSeverities(scan);
    } else {
      return [];
    }
  }

  /**
   * Gets distinct vulnerabilities from the latest Scan of a Project
   */
  async distinctVulnerabilities(project: Project): Promise<ProjectDistinctVulnerabilityDto[]> {
    const scan = await this.latestCompletedScan(project);

    if (scan) {
      return this.scanService.distinctVulnerabilities(scan);
    } else {
      return [];
    }
  }

  getUsersProjectsQuery(userId: string): SelectQueryBuilder<Project> {
    return this.db.createQueryBuilder('project').where('project.userId = :userId', { userId });
  }

  async gitUrlAuthForProject(project: Project) {
    const log = new Logger('gitUrlAuthForProject');

    let gitUrl = project.gitUrl;

    log.log(`gitUrl: ${gitUrl}`);

    if (gitUrl) {
      const urlParts = url.parse(gitUrl);

      const config = await SystemConfiguration.defaultConfiguration();

      let username = null;
      let password = null;

      // If it is a GutHub.com URL, add the Github credentials
      const isGitHubCom = urlParts.hostname.toLowerCase() === 'github.com';

      if (isGitHubCom) {
        log.log(`isGitHubCom: ${isGitHubCom}`);

        if (config.githubComUsernameEnvVar && config.githubComPasswordEnvVar) {
          if (process.env[config.githubComUsernameEnvVar]) {
            username = process.env[config.githubComUsernameEnvVar];
            log.log(`Setting username: process.env['${config.githubComUsernameEnvVar}']`);
          }

          if (process.env[config.githubComPasswordEnvVar]) {
            password = process.env[config.githubComPasswordEnvVar];
            log.log(`Setting password: process.env['${config.githubComPasswordEnvVar}']`);
          }
        }
      } else {
        // If it is a GutHub Enterprise URL, add GHE credentials
        let isGitHubEnterprise = false;

        if (process.env[config.githubEnterpriseUrlEnvVar]) {
          const gheUrl = process.env[config.githubEnterpriseUrlEnvVar];

          log.log(`gheUrl: ${gheUrl}`);

          if (gheUrl) {
            isGitHubEnterprise = urlParts.hostname.toLowerCase() === gheUrl.toLowerCase();

            if (isGitHubEnterprise) {
              log.log(`isGitHubEnterprise: ${isGitHubEnterprise}`);
            }
          }
        }

        if (isGitHubEnterprise) {
          if (config.githubEnterpriseUsernameEnvVar && config.githubEnterprisePasswordEnvVar) {
            username = process.env[config.githubEnterpriseUsernameEnvVar];
            password = process.env[config.githubEnterprisePasswordEnvVar];

            log.log(`Setting username: process.env['${config.githubEnterpriseUsernameEnvVar}']`);
            log.log(`Setting password: process.env['${config.githubEnterprisePasswordEnvVar}']`);

            if (process.env[config.githubEnterpriseUsernameEnvVar]) {
              username = process.env[config.githubEnterpriseUsernameEnvVar];
              log.log(`Setting username: process.env['${config.githubEnterpriseUsernameEnvVar}']`);
            }

            if (process.env[config.githubEnterprisePasswordEnvVar]) {
              password = process.env[config.githubEnterprisePasswordEnvVar];
              log.log(`Setting password: process.env['${config.githubEnterprisePasswordEnvVar}']`);
            }
          }
        }
      }

      if (username && password) {
        urlParts.auth = `${username}:${password}`;

        gitUrl = url.format(urlParts);

        urlParts.auth = `${username}:********`;

        log.log(`gitUrl: ${url.format(urlParts)}`);
      }
    }

    return gitUrl;
  }

  async highestLicenseStatus(project: Project): Promise<ProjectScanStatusType> {
    const scan = await this.latestCompletedScan(project);

    if (scan) {
      const licenseScan = await this.scanService.latestCompletedLicenseScan(scan);

      return this.scanService.highestLicenseStatus(licenseScan, project);
    } else {
      if (project.globalLicenseException) {
        return ProjectScanStatusTypeService.Green();
      } else if ((await this.bomManualLicenseService.manualLicenseCount(project)) > 0) {
        // Must account for the condition when there exists a manual license, but no scans
        return this.scanService.highestLicenseStatus(null, project);
      } else {
        return ProjectScanStatusTypeService.Unknown();
      }
    }
  }

  async highestSecurityStatus(project: Project): Promise<ProjectScanStatusType> {
    const scan = await this.latestCompletedScan(project);

    if (scan) {
      return this.scanService.highestSecurityStatus(scan, project);
    } else {
      if (project.globalSecurityException) {
        return ProjectScanStatusTypeService.Green();
      } else {
        return ProjectScanStatusTypeService.Unknown();
      }
    }
  }

  /**
   * Gets the latest completed Scan of a Project
   */
  async latestCompletedScan(project: Project): Promise<Scan> {
    return await Scan.createQueryBuilder('scan')
      .leftJoin('scan.project', 'project')
      .where('project.id = :id and scan.completed_at is not null', {
        id: project.id,
      })
      .orderBy('scan.completed_at', 'DESC')
      .limit(1)
      .getOne();
  }

  async uniqueBomObligations(
    projectId: number,
    page: number,
    pageSize: number,
  ): Promise<GetManyDefaultResponse<ObligationSearchDto>> {
    const query = `
            select *
            from obligation
            where code in (
                select loo."obligationCode"
                from license_obligations_obligation loo
                where loo."licenseCode" in (
                    select l.code
                    from scan s,
                         license_scan_result lsr,
                         license_scan_result_item lsri,
                         license l
                    where s."projectId" = $1
                      and lsr."scanId" = s.id
                      and lsr.id = lsri."licenseScanId"
                      and l.id = lsri."licenseId"
                    union
                    select l.code
                    from bom_manual_license bomml,
                         license l
                    where bomml."projectId" = $1
                      and l.id = bomml."licenseId"
                    group by l.code)
                group by loo."obligationCode")`;

    return await PaginateRawQuery(this.db.manager, query, [projectId], page, pageSize, record => ({
      id: record.id,
      code: record.code,
      name: record.name,
      desc: record.desc,
    }));
  }
}
