import { NgModule } from '@angular/core';
import { DeploymentTypeDataService } from '@app/shared/+state/deploymentType/deployment-type-data.service';
import { DeploymentTypeService } from '@app/shared/+state/deploymentType/deployment-type.service';
import { LicenseDataService } from '@app/shared/+state/license/license-data.service';
import { LicenseService } from '@app/shared/+state/license/license.service';
import { LicenseScanResultDataService } from '@app/shared/+state/licenseScanResult/license-scan-result-data.service';
import { LicenseScanResultService } from '@app/shared/+state/licenseScanResult/license-scan-result.service';
import { LicenseScanResultItemDataService } from '@app/shared/+state/licenseScanResultItem/license-scan-result-item-data.service';
import { LicenseScanResultItemService } from '@app/shared/+state/licenseScanResultItem/license-scan-result-item.service';
import { LicenseStatusDeploymentTypeDataService } from '@app/shared/+state/licenseStatusDeploymentType/license-status-deployment-type-data.service';
import { LicenseStatusDeploymentTypeService } from '@app/shared/+state/licenseStatusDeploymentType/license-status-deployment-type.service';
import { ObligationDataService } from '@app/shared/+state/obligation/obligation-data.service';
import { ObligationService } from '@app/shared/+state/obligation/obligation.service';
import { OutputFormatTypeDataService } from '@app/shared/+state/outputFormatType/output-format-type-data.service';
import { OutputFormatTypeService } from '@app/shared/+state/outputFormatType/output-format-type.service';
import { PackageManagerDataService } from '@app/shared/+state/packageManager/package-manager-data.service';
import { PackageManagerService } from '@app/shared/+state/packageManager/package-manager.service';
import { ProjectDataService } from '@app/shared/+state/project/project-data-service';
import { ProjectService } from '@app/shared/+state/project/project.service';
import { ProjectDevelopmentTypeDataService } from '@app/shared/+state/projectDevelopmentType/project-development-type-data.service';
import { ProjectDevelopmentTypeService } from '@app/shared/+state/projectDevelopmentType/project-development-type.service';
import { ProjectScanStatusTypeDataService } from '@app/shared/+state/projectScanStatusType/project-scan-status-type-data.service';
import { ProjectScanStatusTypeService } from '@app/shared/+state/projectScanStatusType/project-scan-status-type.service';
import { ProjectStatusTypeDataService } from '@app/shared/+state/projectStatusType/project-status-type-data.service';
import { ProjectStatusTypeService } from '@app/shared/+state/projectStatusType/project-status-type.service';
import { ScanDataService } from '@app/shared/+state/scan/scan-data-service';
import { ScanService } from '@app/shared/+state/scan/scan.service';
import { SecurityScanResultDataService } from '@app/shared/+state/securityScanResult/security-scan-result-data.service';
import { SecurityScanResultService } from '@app/shared/+state/securityScanResult/security-scan-result.service';
import { SecurityScanResultItemDataService } from '@app/shared/+state/securityScanResultItem/security-scan-result-item-data.service';
import { SecurityScanResultItemService } from '@app/shared/+state/securityScanResultItem/security-scan-result-item.service';
import { SecurityScanResultItemStatusTypeDataService } from '@app/shared/+state/securityScanResultItemStatusType/security-scan-result-item-status-type-data.service';
import { SecurityScanResultItemStatusTypeService } from '@app/shared/+state/securityScanResultItemStatusType/security-scan-result-item-status-type.service';
import { SystemConfigurationDataService } from '@app/shared/+state/systemConfiguration/system-configuration-data-service';
import { SystemConfigurationService } from '@app/shared/+state/systemConfiguration/system-configuration.service';
import { VulnerabilityStatusDeploymentTypeDataService } from '@app/shared/+state/vulnerabilityStatusDeploymentType/vulnerability-status-deployment-type-data.service';
import { VulnerabilityStatusDeploymentTypeService } from '@app/shared/+state/vulnerabilityStatusDeploymentType/vulnerability-status-deployment-type.service';
import { EntityDataModule, EntityDataService } from '@ngrx/data';

const services = [
  LicenseService,
  LicenseScanResultService,
  LicenseScanResultItemService,
  LicenseStatusDeploymentTypeService,
  ObligationService,
  ProjectService,
  ScanService,
  SecurityScanResultService,
  SecurityScanResultItemService,
  SecurityScanResultItemStatusTypeService,
  ProjectScanStatusTypeService,
  ProjectStatusTypeService,
  ProjectDevelopmentTypeService,
  OutputFormatTypeService,
  PackageManagerService,
  DeploymentTypeService,
  SystemConfigurationService,
  VulnerabilityStatusDeploymentTypeService,
];

const dataServices = [
  LicenseDataService,
  LicenseScanResultDataService,
  LicenseScanResultItemDataService,
  LicenseStatusDeploymentTypeDataService,
  ObligationDataService,
  ProjectDataService,
  ScanDataService,
  SecurityScanResultDataService,
  SecurityScanResultItemDataService,
  SecurityScanResultItemStatusTypeDataService,
  ProjectScanStatusTypeDataService,
  ProjectStatusTypeDataService,
  ProjectDevelopmentTypeDataService,
  OutputFormatTypeDataService,
  PackageManagerDataService,
  DeploymentTypeDataService,
  SystemConfigurationDataService,
  VulnerabilityStatusDeploymentTypeDataService,
];

const exposes = [EntityDataModule];

@NgModule({
  imports: [...exposes],
  exports: [...exposes],
  providers: [...services, ...dataServices],
})
export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    licenseDataService: LicenseDataService,
    licenseScanResultDataService: LicenseScanResultDataService,
    licenseScanResultItemDataService: LicenseScanResultItemDataService,
    licenseStatusDeploymentTypeDataService: LicenseStatusDeploymentTypeDataService,
    obligationDataService: ObligationDataService,
    projectDataService: ProjectDataService,
    scanDataService: ScanDataService,
    securityScanResultDataService: SecurityScanResultDataService,
    securityScanResultItemDataService: SecurityScanResultItemDataService,
    securityScanResultItemStatusTypeDataService: SecurityScanResultItemStatusTypeDataService,
    projectScanStatusTypeDataService: ProjectScanStatusTypeDataService,
    projectStatusTypeDataService: ProjectStatusTypeDataService,
    projectDevelopmentTypeDataService: ProjectDevelopmentTypeDataService,
    outputFormatTypeDataService: OutputFormatTypeDataService,
    packageManagerDataService: PackageManagerDataService,
    deploymentTypeDataService: DeploymentTypeDataService,
    systemConfigurationDataService: SystemConfigurationDataService,
    vulnerabilityStatusDeploymentTypeDataService: VulnerabilityStatusDeploymentTypeDataService,
  ) {
    entityDataService.registerService('License', licenseDataService);
    entityDataService.registerService('LicenseScanResult', licenseScanResultDataService);
    entityDataService.registerService('LicenseScanResultItem', licenseScanResultItemDataService);
    entityDataService.registerService('LicenseStatusDeploymentType', licenseStatusDeploymentTypeDataService);
    entityDataService.registerService('Obligation', obligationDataService);
    entityDataService.registerService('Project', projectDataService);
    entityDataService.registerService('Scan', scanDataService);
    entityDataService.registerService('SecurityScanResult', securityScanResultDataService);
    entityDataService.registerService('SecurityScanResultItem', securityScanResultItemDataService);
    entityDataService.registerService('SecurityScanResultItemStatusType', securityScanResultItemStatusTypeDataService);
    entityDataService.registerService('ProjectScanStatusType', projectScanStatusTypeDataService);
    entityDataService.registerService('ProjectStatusType', projectStatusTypeDataService);
    entityDataService.registerService('OutputFormatType', outputFormatTypeDataService);
    entityDataService.registerService('PackageManager', packageManagerDataService);
    entityDataService.registerService('DeploymentType', deploymentTypeDataService);
    entityDataService.registerService('SystemConfiguration', systemConfigurationDataService);
    entityDataService.registerService('ProjectDevelopmentType', projectDevelopmentTypeDataService);
    entityDataService.registerService(
      'VulnerabilityStatusDeploymentType',
      vulnerabilityStatusDeploymentTypeDataService,
    );
  }
}
