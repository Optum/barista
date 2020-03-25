import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { BomLicenseExceptionApiService } from './api/bom-license-exception-api.service';
import { BomManualLicenseApiService } from './api/bom-manual-license-api.service';
import { BomSecurityExceptionApiService } from './api/bom-security-exception-api.service';
import { DefaultApiService } from './api/default-api.service';
import { DeploymentTypeApiService } from './api/deployment-type-api.service';
import { GlobalSearchApiService } from './api/global-search-api.service';
import { LicenseApiService } from './api/license-api.service';
import { LicenseScanResultApiService } from './api/license-scan-result-api.service';
import { LicenseScanResultItemApiService } from './api/license-scan-result-item-api.service';
import { LicenseStatusDeploymentTypeApiService } from './api/license-status-deployment-type-api.service';
import { ObligationApiService } from './api/obligation-api.service';
import { ObligationTypeApiService } from './api/obligation-type-api.service';
import { OutputFormatTypeApiService } from './api/output-format-type-api.service';
import { PackageManagerApiService } from './api/package-manager-api.service';
import { ProjectApiService } from './api/project-api.service';
import { ProjectDevelopmentTypeApiService } from './api/project-development-type-api.service';
import { ProjectNotesApiService } from './api/project-notes-api.service';
import { ProjectScanStatusTypeApiService } from './api/project-scan-status-type-api.service';
import { ProjectStatusTypeApiService } from './api/project-status-type-api.service';
import { ScanApiService } from './api/scan-api.service';
import { SecurityScanResultApiService } from './api/security-scan-result-api.service';
import { SecurityScanResultItemApiService } from './api/security-scan-result-item-api.service';
import { SecurityScanResultItemStatusTypeApiService } from './api/security-scan-result-item-status-type-api.service';
import { SystemConfigurationApiService } from './api/system-configuration-api.service';
import { ToolTipApiService } from './api/tool-tip-api.service';
import { UserApiService } from './api/user-api.service';
import { VulnerabilityStatusDeploymentTypeApiService } from './api/vulnerability-status-deployment-type-api.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    BomLicenseExceptionApiService,
    BomManualLicenseApiService,
    BomSecurityExceptionApiService,
    DefaultApiService,
    DeploymentTypeApiService,
    GlobalSearchApiService,
    LicenseApiService,
    LicenseScanResultApiService,
    LicenseScanResultItemApiService,
    LicenseStatusDeploymentTypeApiService,
    ObligationApiService,
    ObligationTypeApiService,
    OutputFormatTypeApiService,
    PackageManagerApiService,
    ProjectApiService,
    ProjectDevelopmentTypeApiService,
    ProjectNotesApiService,
    ProjectScanStatusTypeApiService,
    ProjectStatusTypeApiService,
    ScanApiService,
    SecurityScanResultApiService,
    SecurityScanResultItemApiService,
    SecurityScanResultItemStatusTypeApiService,
    SystemConfigurationApiService,
    ToolTipApiService,
    UserApiService,
    VulnerabilityStatusDeploymentTypeApiService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
