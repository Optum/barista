import { LicenseScanResult, Obligation, Project, ProjectScanStatusType, SecurityScanResult } from '@app/models';
import { ProjectDistinctLicenseDto, ProjectDistinctVulnerabilityDto } from '@app/models/DTOs';
import { ProjectDistinctSeverityDto } from '@app/models/DTOs/ProjectDistinctSeverityDto';
import { Scan } from '@app/models/Scan';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { BomLicenseExceptionService } from '@app/services/bom-license-exception/bom-license-exception.service';
import { BomManualLicenseService } from '@app/services/bom-manual-license/bom-manual-license.service';
import { BomSecurityExceptionService } from '@app/services/bom-security-exception/bom-security-exception.service';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { ProjectScanStatusTypeService } from '@app/services/project-scan-status-type/project-scan-status-type.service';
import { ProjectService } from '@app/services/project/project.service';
import { scanCompletedEmails } from '@app/services/scan/email-templates';
import { SecurityScanResultItemService } from '@app/services/security-scan-result-item/security-scan-result-item.service';
import { SecurityScanResultService } from '@app/services/security-scan-result/security-scan-result.service';
import { SystemConfigurationService } from '@app/services/system-configuration/system-configuration.service';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import * as _ from 'lodash';
import { InjectQueue } from 'nest-bull';
import * as nodemailer from 'nodemailer';
import { In } from 'typeorm';

@Injectable()
export class ScanService extends AppServiceBase<Scan> {
  constructor(
    @Inject(forwardRef(() => LicenseScanResultService))
    private readonly licenseScanResultService: LicenseScanResultService,
    @Inject(forwardRef(() => LicenseScanResultItemService))
    private licenseScanResultItemService: LicenseScanResultItemService,
    @Inject(forwardRef(() => SecurityScanResultService))
    private readonly securityScanResultService: SecurityScanResultService,
    @Inject(forwardRef(() => SecurityScanResultItemService))
    private readonly securityScanResultItemService: SecurityScanResultItemService,
    @Inject(forwardRef(() => BomManualLicenseService))
    private readonly bomManualLicenseService: BomManualLicenseService,
    @Inject(forwardRef(() => BomLicenseExceptionService))
    private readonly bomLicenseExceptionService: BomLicenseExceptionService,
    @Inject(forwardRef(() => BomSecurityExceptionService))
    private readonly bomSecurityExceptionService: BomSecurityExceptionService,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
    @InjectRepository(Scan) repo,
    @InjectQueue('scan-queue') readonly queue: Queue,
  ) {
    super(repo);
  }

  private logger = new Logger('ScanService');

  /**
   * Gets distinct licenses from the latest LicenseScanResult of a scan
   */
  async distinctLicenses(scan: Scan): Promise<ProjectDistinctLicenseDto[]> {
    const licenseScan = await this.latestCompletedLicenseScan(scan);

    if (licenseScan) {
      return this.licenseScanResultService.distinctLicenses(licenseScan);
    } else {
      return [];
    }
  }

  /**
   * Gets distinct obligations from the latest LicenseScanResult of a scan
   */
  async distinctObligations(scan: Scan): Promise<Obligation[]> {
    const licenseScan = await this.latestCompletedLicenseScan(scan);

    if (licenseScan) {
      return this.licenseScanResultService.distinctObligations(licenseScan);
    } else {
      return [];
    }
  }

  /**
   * Gets distinct vulnerabilities from a SecurityScanResult of a scan
   */
  async distinctSeverities(scan: Scan): Promise<ProjectDistinctSeverityDto[]> {
    const securityScan = await this.latestCompletedSecurityScan(scan);

    if (securityScan) {
      return this.securityScanResultService.distinctSeverities(securityScan);
    } else {
      return [];
    }
  }

  /**
   * Gets distinct vulnerabilities from a SecurityScanResult of a scan
   */
  async distinctVulnerabilities(scan: Scan): Promise<ProjectDistinctVulnerabilityDto[]> {
    const securityScan = await this.latestCompletedSecurityScan(scan);

    if (securityScan) {
      return this.securityScanResultService.distinctVulnerabilities(securityScan);
    } else {
      return [];
    }
  }

  async highestLicenseStatus(licenseScanResult: LicenseScanResult, project: Project): Promise<ProjectScanStatusType> {
    if (project.globalLicenseException) {
      return ProjectScanStatusTypeService.Green();
    } else {
      let scanCodes = [];

      if (licenseScanResult) {
        const licenseItems = await (await this.licenseScanResultItemService.bomLicenseResultItemQuery(
          licenseScanResult.scan,
          '',
        )).getMany();

        const licenseCodes = _.map(licenseItems, (item: any) => {
          return item.projectScanStatus.code;
        });

        scanCodes = scanCodes.concat(licenseCodes);
      }

      const manualLicenseCodes = await this.bomManualLicenseService.manualLicenseCodes(project);

      scanCodes = scanCodes.concat(manualLicenseCodes);

      const licenseExceptionCodes = await this.bomLicenseExceptionService.licenseExceptionCodes(project);

      scanCodes = scanCodes.concat(licenseExceptionCodes);

      return this.highestProjectScanStatus(scanCodes);
    }
  }

  private async highestProjectScanStatus(scanStatusCodes): Promise<ProjectScanStatusType> {
    const greenStatus = await ProjectScanStatusTypeService.Green();
    const yellowStatus = await ProjectScanStatusTypeService.Yellow();
    const redStatus = await ProjectScanStatusTypeService.Red();
    const unknownStatus = await ProjectScanStatusTypeService.Unknown();

    const unique = _.uniqWith(scanStatusCodes, _.isEqual);

    if (_.indexOf(unique, redStatus.code) > -1) {
      return redStatus;
    } else if (_.indexOf(unique, yellowStatus.code) > -1) {
      return yellowStatus;
    } else if (_.indexOf(unique, greenStatus.code) > -1) {
      return greenStatus;
    } else {
      return unknownStatus;
    }
  }

  async highestSecurityStatus(scan: Scan, project: Project): Promise<ProjectScanStatusType> {
    if (project.globalSecurityException) {
      return ProjectScanStatusTypeService.Green();
    } else {
      const securityScanResult = await this.latestCompletedSecurityScan(scan);

      let scanCodes = [];

      if (securityScanResult) {
        const securityItems = await (await this.securityScanResultItemService.bomSecurityResultItemQuery(
          securityScanResult.scan,
          '',
        )).getMany();

        const codes = _.map(securityItems, (item: any) => {
          return item.projectScanStatus.code;
        });

        scanCodes = scanCodes.concat(codes);
      }

      const securityExceptionCodes = await this.bomSecurityExceptionService.securityExceptionCodes(project);

      scanCodes = scanCodes.concat(securityExceptionCodes);

      if (scan && scanCodes.length === 0) {
        return await ProjectScanStatusTypeService.Green();
      } else {
        return await this.highestProjectScanStatus(scanCodes);
      }
    }
  }

  /**
   * Gets the latest completed LicenseScanResult of a scan
   */
  async latestCompletedLicenseScan(scan: Scan): Promise<LicenseScanResult> {
    return await LicenseScanResult.createQueryBuilder('result')
      .leftJoinAndSelect('result.scan', 'scan')
      .leftJoinAndSelect('scan.project', 'project')
      .leftJoinAndSelect('project.deploymentType', 'deployType')
      .where('scan.id = :id and result.completed_at is not null', {
        id: scan.id,
      })
      .orderBy('result.completed_at', 'DESC')
      .limit(1)
      .getOne();
  }

  /**
   * Gets the latest completed SecurityScanResult of a scan
   */
  async latestCompletedSecurityScan(scan: Scan): Promise<SecurityScanResult> {
    return await SecurityScanResult.createQueryBuilder('result')
      .leftJoinAndSelect('result.scan', 'scan')
      .where('scan.id = :id and result.completed_at is not null', {
        id: scan.id,
      })
      .orderBy('result.completed_at', 'DESC')
      .limit(1)
      .getOne();
  }

  async sendMailOnScanCompletion(scan: Scan) {
    if (scan && scan.project && scan.project.outputEmail) {
      const config = await SystemConfigurationService.defaultConfiguration();

      const fromAddress = config.emailFromAddress || 'noreply@barista.local';
      const subject = `[Barista OSS] Scan activity for project ${scan.project.name} has completed.`;

      const emailTemplate = scanCompletedEmails(scan, this.projectService);
      const textBody = await emailTemplate.text();
      const htmlBody = await emailTemplate.html();

      if ((process.env.NODE_ENV || 'development').toLowerCase() === 'development') {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: fromAddress, // sender address
          to: scan.project.outputEmail, // list of receivers
          subject, // Subject line
          text: textBody, // plain text body
          html: htmlBody, // html body
        });

        this.logger.debug(`Message sent: ${info.messageId}`);

        // Preview only available when sending through an Ethereal account
        this.logger.debug(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      }

      if (process.env.SMTP_SERVER) {
        this.logger.log(`process.env.SMTP_SERVER found: ${process.env.SMTP_SERVER}`);

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_SERVER,
          port: 25,
          secure: false,
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: fromAddress, // sender address
          to: scan.project.outputEmail, // list of receivers
          subject, // Subject line
          text: textBody, // plain text body
          html: htmlBody, // html body
        });

        this.logger.debug(`Message sent to ${process.env.SMTP_SERVER}: ${info.messageId}`);
      }
    } else {
      let scanId = '?';

      if (scan && scan.id) {
        scanId = scan.id.toString();
      }

      this.logger.error(
        `sendMailOnScanCompletion(): (scan && scan.project && scan.project.outputEmail) returned false for: ${scanId}`,
      );
    }
  }

  async tryGetLatestRunningScan(projectId: number): Promise<Scan> {
    const activeJobs = await this.queue.getActive();
    const activeJobsScanIds = activeJobs.map(job => job.data).map(data => data.scanId);

    if (_.isEmpty(activeJobsScanIds)) {
      return null;
    }

    return await this.db.findOne({ where: { projectId, id: In(activeJobsScanIds) } });
  }
}
