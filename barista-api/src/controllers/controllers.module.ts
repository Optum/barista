import { BomLicenseExceptionController } from '@app/controllers/bom-license-exception/bom-license-exception.controller';
import { BomManualLicenseController } from '@app/controllers/bom-manual-license/bom-manual-license.controller';
import { BomSecurityExceptionController } from '@app/controllers/bom-security-exception/bom-security-exception.controller';
import { DeploymentTypeController } from '@app/controllers/deployment-type/deployment-type.controller';
import { GlobalSearchController } from '@app/controllers/global-search/global-search.controller';
import { LicenseScanResultItemController } from '@app/controllers/license-scan-result-item/license-scan-result-item.controller';
import { LicenseScanResultController } from '@app/controllers/license-scan-result/license-scan-result.controller';
import { LicenseStatusDeploymentTypeController } from '@app/controllers/license-status-deployment-type/license-status-deployment-type.controller';
import { LicenseController } from '@app/controllers/license/license.controller';
import { ObligationTypeController } from '@app/controllers/obligation-type/obligation-type.controller';
import { ObligationController } from '@app/controllers/obligation/obligation.controller';
import { OutputFormatTypeController } from '@app/controllers/output-format-type/output-format-type.controller';
import { PackageManagerController } from '@app/controllers/package-manager/package-manager.controller';
import { ProjectDevelopmentTypeController } from '@app/controllers/project-development-type/project-development-type.controller';
import { ProjectNotesController } from '@app/controllers/project-notes/project-notes.controller';
import { ProjectScanStatusTypeController } from '@app/controllers/project-scan-status-type/project-scan-status-type.controller';
import { ProjectStatusTypeController } from '@app/controllers/project-status-type/project-status-type.controller';
import { ProjectController } from '@app/controllers/project/project.controller';
import { ScanController } from '@app/controllers/scan/scan.controller';
// tslint:disable-next-line:max-line-length
import { SecurityScanResultItemStatusTypeController } from '@app/controllers/security-scan-result-item-status-type/security-scan-result-item-status-type.controller';
import { SecurityScanResultItemController } from '@app/controllers/security-scan-result-item/security-scan-result-item.controller';
import { SecurityScanResultController } from '@app/controllers/security-scan-result/security-scan-result.controller';
import { SystemConfigurationController } from '@app/controllers/system-configuration/system-configuration.controller';
import { ToolTipController } from '@app/controllers/tooltips/tooltip.controller';
// tslint:disable-next-line:max-line-length
import { VulnerabilityStatusDeploymentTypeController } from '@app/controllers/vulnerability-status-deployment-type/vulnerability-status-deployment-type.controller';
import { ServicesModule } from '@app/services/services.module';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { AppQueueModule } from '@app/shared/app-queue.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user/user.controller';

@Module({
  imports: [AppQueueModule, AppOrmModule, ServicesModule, CqrsModule],
  providers: [],
  controllers: [
    BomLicenseExceptionController,
    BomManualLicenseController,
    BomSecurityExceptionController,
    DeploymentTypeController,
    GlobalSearchController,
    LicenseController,
    LicenseScanResultController,
    LicenseScanResultItemController,
    LicenseStatusDeploymentTypeController,
    ObligationController,
    ObligationTypeController,
    OutputFormatTypeController,
    PackageManagerController,
    ProjectController,
    ProjectDevelopmentTypeController,
    ProjectNotesController,
    ProjectScanStatusTypeController,
    ProjectStatusTypeController,
    ScanController,
    SecurityScanResultController,
    SecurityScanResultItemController,
    SecurityScanResultItemStatusTypeController,
    SystemConfigurationController,
    ToolTipController,
    UserController,
    VulnerabilityStatusDeploymentTypeController,
  ],
})
export class ControllersModule {}
