import { LicenseScanResultItemService } from './../../services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultItem } from './../../models/LicenseScanResultItem';
import { Index } from 'typeorm';
import { Project, ProjectScanStatusType, VulnerabilityStatusDeploymentType } from '@app/models';
import { ProjectScanStatusTypeService } from '@app/services/project-scan-status-type/project-scan-status-type.service';
import { ProjectService } from '@app/services/project/project.service';
import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Res,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';

import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  GetManyDefaultResponse,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';

@Crud({
  model: {
    type: Project,
  },
  routes: {
    only: ['getManyBase'],
  },
})
@ApiUseTags('Stats')
@Controller('stats')
export class StatsController implements CrudController<Project> {
  constructor(public service: ProjectService, private licenseScanResultItemService: LicenseScanResultItemService) {}
  get base(): CrudController<Project> {
    return this;
  }

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    const answer = (await this.base.getManyBase(req)) as Project[];

    let i;
    for (i = 0; i < answer.length; i++) {
      const licenseStatus = await this.service.highestLicenseStatus(answer[i]);
      const securityStatus = await this.service.highestSecurityStatus(answer[i]);
      if (licenseStatus) {
        answer[i].LatestLicenseStatus = licenseStatus;
      }
      if (securityStatus) {
        answer[i].LatestSecurityStatus = securityStatus;
      }
    }
    return answer;
  }

  createFormat(label: string, value: string, status: string) {
    let color = status;
    if (status === 'unknown') {
      color = 'lightgrey';
      value = 'unknown';
    }

    const format = {
      text: [label, value],
      color: color,
      labelColor: '#855',
      template: 'flat',
    };

    return format;
  }

  createSVG(format: any) {
    const { BadgeFactory } = require('gh-badges');
    const bf = new BadgeFactory();

    return bf.create(format);
  }

  async getLatestScanDate(project: Project) {
    if (project) {
      const scan = await this.service.latestCompletedScan(project);
      if (scan) {
        return scan.createdAt.toDateString();
      }
    }
  }

  @Get('/badges/:id/licensestate')
  @Header('Content-Type', 'image/svg+xml')
  @Header('Content-Disposition', 'attachment; filename=licensestate.svg')
  async getLicenseState(@Param('id') id: string, @Res() res: Response) {
    const project = await this.service.db.findOne(Number(id));

    let licenseStatus = await ProjectScanStatusTypeService.Unknown();
    let latestScanDate = 'unknown';
    if (project) {
      const checklicenseStatus = await this.service.highestLicenseStatus(project);
      if (checklicenseStatus) {
        licenseStatus = checklicenseStatus;
      }
      latestScanDate = await this.getLatestScanDate(project);
    }

    const svg = this.createSVG(this.createFormat('barista license state', latestScanDate, licenseStatus.code));
    return res
      .status(200)
      .send(svg)
      .end();
  }

  @Get('/badges/:id/securitystate')
  @Header('Content-Type', 'image/svg+xml')
  @Header('Content-Disposition', 'attachment; filename=securitystate.svg')
  async getSecurityState(@Param('id') id: string, @Res() res: Response) {
    const project = await this.service.db.findOne(Number(id));

    let securityStatus = await ProjectScanStatusTypeService.Unknown();
    let latestScanDate = 'unknown';
    if (project) {
      const checksecurityStatus = await this.service.highestSecurityStatus(project);
      if (checksecurityStatus) {
        securityStatus = checksecurityStatus;
      }
      latestScanDate = await this.getLatestScanDate(project);
    }

    const svg = this.createSVG(this.createFormat('barista security state', latestScanDate, securityStatus.code));
    return res
      .status(200)
      .send(svg)
      .end();
  }

  @Get('/badges/:id/vulnerabilities')
  @Header('Content-Type', 'image/svg+xml')
  @Header('Content-Disposition', 'attachment; filename=vulnerabilities.svg')
  async getvulnerabilities(@Param('id') id: string, @Res() res: Response) {
    const project = await this.service.db.findOne(Number(id));

    let securityStatus = await ProjectScanStatusTypeService.Unknown();
    let valueString = '';
    if (project) {
      const vulnerabilities = await this.service.distinctSeverities(project);
      securityStatus = await this.service.highestSecurityStatus(project);
      if (vulnerabilities.length === 0) {
        valueString = 'none detected';
      }
      vulnerabilities.forEach(vul => (valueString = valueString + vul.severity + ':' + vul.count + ' '));
    }

    const svg = this.createSVG(this.createFormat('barista vulnerabilities', valueString, securityStatus.code));
    return res
      .status(200)
      .send(svg)
      .end();
  }

  @Get('/badges/:id/components')
  @Header('Content-Type', 'image/svg+xml')
  @Header('Content-Disposition', 'attachment; filename=components.svg')
  async getComponentsResults(@Param('id') id: string, @Res() res: Response) {
    const project = await this.service.db.findOne(Number(id));
    let valueString = 'unknown';
    let color = 'lightgrey';
    if (project) {
      const scan = await this.service.latestCompletedScan(project);
      if (scan) {
        const query = await this.licenseScanResultItemService.db
          .createQueryBuilder('resultItem')
          .leftJoin('resultItem.licenseScan', 'licenseScan')
          .leftJoinAndSelect('resultItem.projectScanStatus', 'projectScanStatus')
          .leftJoinAndSelect('resultItem.license', 'license')
          .leftJoin('licenseScan.scan', 'scan')
          .where('scan.id = :id', { id: scan.id })
          .getMany();

        valueString = query.length.toString();
        color = '#edb';
      }
    }

    const svg = this.createSVG(this.createFormat('barista open source components', valueString, color));
    return res
      .status(200)
      .send(svg)
      .end();
  }
}
