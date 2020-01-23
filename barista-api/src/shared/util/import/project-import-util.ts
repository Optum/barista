import {
  BomManualLicense,
  DeploymentType,
  License,
  OutputFormatType,
  PackageManager,
  Project,
  ProjectDevelopmentType,
  ProjectNote,
  ProjectStatusType,
} from '@app/models';
import { LicenseService } from '@app/services/license/license.service';
import { getFileContentsSync } from '@app/shared/util/get-file-contents-sync';
import { Logger } from '@nestjs/common';
import parse = require('csv-parse/lib/sync');
import { Repository } from 'typeorm';

export function loadCsvFile(filename: string) {
  const csvText = getFileContentsSync(filename);

  return loadCsvString(csvText);
}

export function loadCsvString(csvText: string) {
  //  See: https://csv.js.org/parse/options/
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    delimiter: '|',
    trim: true,
    skip_lines_with_error: false,
    quote: null,
  });

  return records;
}

export async function projectFromCommunityRecord(
  record: any,
  projectRepo: Repository<Project>,
  licenseRepo: Repository<License>,
  bomLicenseRepo: Repository<BomManualLicense>,
  notesRepo: Repository<ProjectNote>,
  tag?: string,
) {
  const logger = new Logger('projectFromCommunityRecord');

  try {
    const project = new Project();
    project.wasImported = true;
    project.importMetaData = record;

    project.currentVersion = record.component_version;
    project.name = record.component_name;
    project.userId = record.application_owner_msid;
    project.projectStatus = { code: 'new' } as ProjectStatusType;
    project.outputFormat = { code: 'json' } as OutputFormatType;
    project.outputEmail = record.application_owner_email;
    project.owner = record.application_owner_email;

    project.developmentType = { code: 'community' } as ProjectDevelopmentType;

    // Get deployment type
    project.deploymentType = await deploymentTypeFromImportString(record.application_deployment);

    project.packageManager = { code: 'none' } as PackageManager;

    project.globalLicenseException = true;
    project.globalSecurityException = true;

    if (tag) {
      project.tag = tag;
    }

    await projectRepo.save(project);

    const license = await LicenseService.fuzzyMatchLicense(record.component_license, licenseRepo);

    if (license) {
      // Get License
      const manualLicense = new BomManualLicense();
      manualLicense.project = project;
      manualLicense.productName = project.name;
      manualLicense.productVersion = project.currentVersion;
      manualLicense.license = license;
      manualLicense.userId = project.userId;
      await bomLicenseRepo.save(manualLicense);
    } else {
      // TODO: Account for the situation where there is no license...
    }

    // insert note, for the timeline
    await notesRepo.save({
      note: 'Legacy system data load',
      notePayload: JSON.stringify(record, null, 2),
      project,
      userId: project.userId,
      tag: project.tag,
    });

    return project;
  } catch (e) {
    // tslint:disable:no-console
    logger.error(JSON.stringify(record, null, 2));
    logger.error(JSON.stringify(e, null, 2));
    // tslint:enable:no-console
  }
}

export async function projectFromApprovedRecord(record: any, tag?: string) {
  const logger = new Logger('projectFromApprovedRecord');

  try {
    const project = new Project();
    project.wasImported = true;
    project.importMetaData = record;

    project.name = record.applicationName || 'NO NAME';
    project.userId = record.applicationOwnerMsid;
    project.projectStatus = { code: 'new' } as ProjectStatusType;
    project.outputFormat = { code: 'json' } as OutputFormatType;
    project.outputEmail = record.applicationOwnerEmail;
    project.owner = record.applicationOwnerEmail;

    project.description = record.applicationDesc;

    project.developmentType = { code: 'organization' } as ProjectDevelopmentType;

    // Get deployment type
    project.deploymentType = await deploymentTypeFromImportString(record.applicationDeployment);

    project.packageManager = { code: 'none' } as PackageManager;

    project.globalLicenseException = true;
    project.globalSecurityException = true;

    if (tag) {
      project.tag = tag;
    }

    return project;
  } catch (e) {
    // tslint:disable:no-console
    logger.error(JSON.stringify(record, null, 2));
    logger.error(JSON.stringify(e, null, 2));
    // tslint:enable:no-console
  }
}

export async function manualLicensesFromApprovedRecords(
  records: any[],
  project: Project,
  getLicense: (fuzzyString: string) => Promise<License>,
  tag?: string,
) {
  // const logger = new Logger('manualLicensesFromApprovedRecords');

  let record;

  const manualLicenses = [];
  while (records.length > 0) {
    record = null;
    record = records.shift();

    // Get License
    const manualLicense = new BomManualLicense();
    manualLicense.project = project;
    manualLicense.productName = record.componentName || 'UNKNOWN';
    manualLicense.productVersion = record.componentVersion || 'UNKNOWN';

    manualLicense.userId = project.userId;
    manualLicense.tag = tag;
    manualLicense.metaData = record;

    const license = await getLicense(record.componentLicense);

    if (license) {
      manualLicense.license = license;
    } else {
      manualLicense.license = { code: 'UNKNOWN' } as License;
    }

    manualLicenses.push(manualLicense);
  }

  return manualLicenses;
}

export async function deploymentTypeFromImportString(deployTypeString: string) {
  let deployType = { code: 'internal' } as DeploymentType;
  switch (deployTypeString) {
    case 'Distributed Application': {
      deployType = { code: 'distributed' } as DeploymentType;
      break;
    }
    case 'Internally Deployed Tool': {
      deployType = { code: 'internal' } as DeploymentType;
      break;
    }
    case 'Third Party Hosted Application': {
      deployType = { code: 'distributed' } as DeploymentType;
      break;
    }
    case 'Internally Consumed Application': {
      deployType = { code: 'internal' } as DeploymentType;
      break;
    }
    case 'External Facing Internal Hosted Application': {
      deployType = { code: 'external' } as DeploymentType;
      break;
    }
    case 'Community Contribution': {
      deployType = { code: 'unspecified' } as DeploymentType;
      break;
    }
    default: {
      deployType = { code: 'unspecified' } as DeploymentType;
      break;
    }
  }

  return deployType;
}
