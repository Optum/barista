import { BomLicenseExceptionService } from '@app/services/bom-license-exception/bom-license-exception.service';
import { BomManualLicenseService } from '@app/services/bom-manual-license/bom-manual-license.service';
import { BomSecurityExceptionService } from '@app/services/bom-security-exception/bom-security-exception.service';
import { LogProjectChangeCommandHandler } from '@app/services/command-handlers/LogProjectChangeCommandHandler';
import { DeploymentTypeService } from '@app/services/deployment-type/deployment-type.service';
import { GlobalSearchService } from '@app/services/global-search/global-search.service';
import { LicenseScanResultItemService } from '@app/services/license-scan-result-item/license-scan-result-item.service';
import { LicenseScanResultService } from '@app/services/license-scan-result/license-scan-result.service';
import { LicenseStatusDeploymentTypeService } from '@app/services/license-status-deployment-type/license-status-deployment-type.service';
import { LicenseService } from '@app/services/license/license.service';
import { ObligationTypeService } from '@app/services/obligation-type/obligation-type.service';
import { ObligationService } from '@app/services/obligation/obligation.service';
import { OutputFormatTypeService } from '@app/services/output-format-type/output-format-type.service';
import { PackageManagerService } from '@app/services/package-manager/package-manager.service';
import { ProjectDevelopmentTypeService } from '@app/services/project-development-type/project-development-type.service';
import { ProjectNotesService } from '@app/services/project-notes/project-notes.service';
import { ProjectScanStatusTypeService } from '@app/services/project-scan-status-type/project-scan-status-type.service';
import { ProjectStatusTypeService } from '@app/services/project-status-type/project-status-type.service';
import { ProjectService } from '@app/services/project/project.service';
import { ScanService } from '@app/services/scan/scan.service';
// tslint:disable-next-line:max-line-length
import { SecurityScanResultItemStatusTypeService } from '@app/services/security-scan-result-item-status-type/security-scan-result-item-status-type.service';
import { SecurityScanResultItemService } from '@app/services/security-scan-result-item/security-scan-result-item.service';
import { SecurityScanResultService } from '@app/services/security-scan-result/security-scan-result.service';
import { SystemConfigurationService } from '@app/services/system-configuration/system-configuration.service';
import { ToolTipService } from '@app/services/tooltips/tooltips.service';
import { jwtConstants } from '@app/services/user/constants';
import { JwtStrategy } from '@app/services/user/jwt.strategy';
import { LdapService } from '@app/services/user/ldap.service';
import { LocalStrategy } from '@app/services/user/local.strategy';
import { UserService } from '@app/services/user/user.service';
// tslint:disable-next-line:max-line-length
import { VulnerabilityStatusDeploymentTypeService } from '@app/services/vulnerability-status-deployment-type/vulnerability-status-deployment-type.service';
import { AppOrmModule } from '@app/shared/app-orm.module';
import { AppQueueModule } from '@app/shared/app-queue.module';
import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

const services = [
  BomLicenseExceptionService,
  BomManualLicenseService,
  BomSecurityExceptionService,
  DeploymentTypeService,
  GlobalSearchService,
  JwtStrategy,
  LdapService,
  LicenseScanResultItemService,
  LicenseScanResultService,
  LicenseService,
  LicenseStatusDeploymentTypeService,
  LocalStrategy,
  ObligationService,
  ObligationTypeService,
  OutputFormatTypeService,
  PackageManagerService,
  ProjectDevelopmentTypeService,
  ProjectNotesService,
  ProjectScanStatusTypeService,
  ProjectService,
  ProjectStatusTypeService,
  ScanService,
  SecurityScanResultItemService,
  SecurityScanResultItemStatusTypeService,
  SecurityScanResultService,
  SystemConfigurationService,
  ToolTipService,
  UserService,
  VulnerabilityStatusDeploymentTypeService,
];

const CommandHandlers = [LogProjectChangeCommandHandler];

@Module({
  imports: [
    forwardRef(() => AppOrmModule),
    AppQueueModule,
    PassportModule,
    CqrsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: services,
  providers: [...services, ...CommandHandlers],
  controllers: [],
})
export class ServicesModule {}
