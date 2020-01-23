import { entityCodeFilter } from '@app/shared/+state/filters/entity-code-filter';
import { entityIdFilter } from '@app/shared/+state/filters/entity-id-filter';
import { entityProjectFilter } from '@app/shared/+state/filters/entity-project-filter';
import { entityScanFilter } from '@app/shared/+state/filters/entity-scan-filter';
import { licenseScanResultItemFilter } from '@app/shared/+state/licenseScanResultItem/license-scan-result-item-filter';
import { securityScanResultItemFilter } from '@app/shared/+state/securityScanResultItem/security-scan-result-item-filter';
import { codeSelectId } from '@app/shared/+state/selectors/code-select-id';
import { EntityMetadataMap } from '@ngrx/data';

/**
 * See: https://ngrx.io/guide/data/entity-metadata
 */
const entityMetadata: EntityMetadataMap = {
  License: {
    filterFn: entityIdFilter,
  },
  LicenseScanResult: {
    filterFn: entityScanFilter,
  },
  LicenseScanResultItem: {
    filterFn: licenseScanResultItemFilter,
  },
  LicenseStatusDeploymentType: {
    filterFn: entityIdFilter,
  },
  Obligation: {
    filterFn: entityIdFilter,
  },
  Project: {
    filterFn: entityIdFilter,
  },
  Scan: {
    filterFn: entityProjectFilter,
  },
  SecurityScanResult: {
    filterFn: entityScanFilter,
  },
  SecurityScanResultItem: {
    filterFn: securityScanResultItemFilter,
  },
  SecurityScanResultItemStatusType: {
    filterFn: entityCodeFilter,
    selectId: codeSelectId,
  },
  ProjectScanStatusType: {
    filterFn: entityCodeFilter,
    selectId: codeSelectId,
  },
  ProjectStatusType: {
    filterFn: entityCodeFilter,
    selectId: codeSelectId,
  },
  OutputFormatType: {
    filterFn: entityCodeFilter,
    selectId: codeSelectId,
  },
  PackageManager: {
    filterFn: entityCodeFilter,
    selectId: codeSelectId,
  },
  DeploymentType: {
    filterFn: entityCodeFilter,
    selectId: codeSelectId,
  },
  ProjectDevelopmentType: {
    filterFn: entityCodeFilter,
    selectId: codeSelectId,
  },
  SystemConfiguration: {
    filterFn: entityCodeFilter,
    selectId: codeSelectId,
  },
  VulnerabilityStatusDeploymentType: {
    filterFn: entityIdFilter,
  },
};

// because the plural of "hero" is not "heros"
// const pluralNames = { Hero: 'Heroes' };
const pluralNames = {};

export const entityConfig = {
  entityMetadata,
  pluralNames,
};
