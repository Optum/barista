// tslint:disable:max-line-length
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SystemConfigurationComponent } from '@app/features/system-configuration/system-configuration.component';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { DashboardComponent } from '@app/features/dashboard/dashboard.component';

import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from '@app/features/projects/projects.component';
import { ApiModule, Configuration, ConfigurationParameters } from '@app/shared/api';
import { BASE_PATH } from '@app/shared/api/variables';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { FooterComponent } from '@app/shared/layout/footer/footer.component';
import { HeaderComponent } from '@app/shared/layout/header/header.component';
import { SideNavComponent } from '@app/shared/layout/side-nav/side-nav.component';

import { ProjectDetailsComponent } from '@app/features/projects/project-details/project-details.component';
import { ProjectScanDetailsComponent } from '@app/features/projects/project-scans/project-scan-details/project-scan-details.component';
import { ProjectScansComponent } from '@app/features/projects/project-scans/project-scans.component';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';

import { Router } from '@angular/router';
import { DashboardModule } from '@app/dashboard.module';
import { AuthService } from '@app/features/auth/auth.service';
import { BillOfMaterialsComponent } from '@app/features/bill-of-materials/bill-of-materials.component';
import { BomLicenseExceptionDetailsDialogComponent } from '@app/features/bill-of-materials/bom-license-exceptions/bom-license-exception-details/bom-license-exception-details-dialog.component';
import { BomLicenseExceptionDetailsComponent } from '@app/features/bill-of-materials/bom-license-exceptions/bom-license-exception-details/bom-license-exception-details.component';
import { BomManualLicenseDetailsDialogComponent } from '@app/features/bill-of-materials/bom-manual-licenses/bom-manual-license-details/bom-manual-license-details-dialog.component';
import { BomManualLicenseDetailsComponent } from '@app/features/bill-of-materials/bom-manual-licenses/bom-manual-license-details/bom-manual-license-details.component';
import { BomSecurityExceptionDetailsDialogComponent } from '@app/features/bill-of-materials/bom-security-exception/bom-security-exception-details/bom-security-exception-details-dialog.component';
import { BomSecurityExceptionDetailsComponent } from '@app/features/bill-of-materials/bom-security-exception/bom-security-exception-details/bom-security-exception-details.component';
import { BomSecurityExceptionComponent } from '@app/features/bill-of-materials/bom-security-exception/bom-security-exception.component';
import { LicenseObligationComponent } from '@app/features/license-obligation/license-obligation.component';
import { LicenseDetailsComponent } from '@app/features/licenses/license-details/license-details.component';
import { LicensesExceptionsComponent } from '@app/features/licenses/licenses-exceptions/licenses.exceptions.component';
import { LicensesComponent } from '@app/features/licenses/licenses.component';
import { ObligationDetailsViewComponent } from '@app/features/obligations/obligation-details-view/obligation-details-view.component';
import { ObligationDetailsComponent } from '@app/features/obligations/obligation-details/obligation-details.component';
import { ObligationsComponent } from '@app/features/obligations/obligations.component';
import { OutputFormatTypeDetailsComponent } from '@app/features/output-format/output-format-type-details/output-format-type-details.component';
import { OutputFormatComponent } from '@app/features/output-format/output-format.component';
import { PackageManagerDetailsComponent } from '@app/features/package-managers/package-manager-details/package-manager-details.component';
import { PackageManagersComponent } from '@app/features/package-managers/package-managers.component';
import { ProjectStatusTypeDetailsComponent } from '@app/features/project-status-types/project-status-type-details/project-status-type-details.component';
import { ProjectStatusTypesComponent } from '@app/features/project-status-types/project-status-types.component';
import { ProjectNotesDetailsDialogComponent } from '@app/features/projects/project-details/project-notes/project-notes-details/project-notes-details-dialog.component';
import { ProjectNotesDetailsComponent } from '@app/features/projects/project-details/project-notes/project-notes-details/project-notes-details.component';
import { ProjectNotesComponent } from '@app/features/projects/project-details/project-notes/project-notes.component';
import { ProjectStatusNormalComponent } from '@app/features/projects/project-details/project-status/project-status-normal/project-status-normal.component';
import { LicenseScanResultItemsComponent } from '@app/features/projects/project-scans/project-scan-details/license-scan-result/license-scan-result-items/license-scan-result-items.component';
import { LicenseScanResultComponent } from '@app/features/projects/project-scans/project-scan-details/license-scan-result/license-scan-result.component';
import { SecurityScanResultItemsComponent } from '@app/features/projects/project-scans/project-scan-details/security-scan-result/security-scan-result-items/security-scan-result-items.component';
import { SecurityScanResultComponent } from '@app/features/projects/project-scans/project-scan-details/security-scan-result/security-scan-result.component';
import { SigninComponent } from '@app/features/signin/signin.component';
import { SignupComponent } from '@app/features/signup/signup.component';
import { VulnerabilityStatusDeploymentTypesDetailsComponent } from '@app/features/vulnerability-status-deployment-types/vulnerability-status-deployment-types-details/vulnerability-status-deployment-types-details.component';
import { VulnerabilityStatusDeploymentTypesComponent } from '@app/features/vulnerability-status-deployment-types/vulnerability-status-deployment-types.component';
import { FlexLayoutTypeComponent } from '@app/shared/app-components/flex-layout-type.component';
import { ObjectDetailsComponent } from '@app/shared/app-components/object-details/object-details.component';
import { AuthInterceptor } from '@app/shared/helpers/AuthInterceptor';
import { NavService } from '@app/shared/nav/nav.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { SafePipeModule } from 'safe-pipe';
import { TrustHtmlModule } from 'trust-html-pipe';
import { BomLicenseExceptionsComponent } from './features/bill-of-materials/bom-license-exceptions/bom-license-exceptions.component';
import { BomLicensesComponent } from './features/bill-of-materials/bom-licenses/bom-licenses.component';
import { BomManualLicensesComponent } from './features/bill-of-materials/bom-manual-licenses/bom-manual-licenses.component';

import { BomGroupedLicenseModulesComponent } from '@app/features/bill-of-materials/bom-grouped-license/bom-grouped-license-modules/bom-grouped-license-modules.component';
import { BomGroupedLicenseModulesDialogComponent } from '@app/features/bill-of-materials/bom-grouped-license/bom-grouped-license-modules/bom-grouped-license-modules.dialog.component';
import { BomGroupedLicensesComponent } from '@app/features/bill-of-materials/bom-grouped-license/bom-grouped-licenses.component';
import { ModuleSearchComponent } from '@app/features/module-search/module-search.component';
import { TooltipDetailsComponent } from '@app/features/tooltips/tooltip-details/tooltip-details.component';
import { TooltipsComponent } from '@app/features/tooltips/tooltips.component';
import { AppServicesModule } from '@app/shared/services/app-services.module';
import { BomVulnerabilitiesComponent } from './features/bill-of-materials/bom-vulnerabilities/bom-vulnerabilities.component';
import { ProjectStatsComponent } from './features/projects/project-details/project-stats/project-stats.component';
import { ProjectStatusComponent } from './features/projects/project-details/project-status/project-status.component';
import { LicenseScanResultItemDetailsComponent } from './features/projects/project-scans/project-scan-details/license-scan-result/license-scan-result-items/license-scan-result-item-details/license-scan-result-item-details.component';
import { SecurityScanResultItemDetailsComponent } from './features/projects/project-scans/project-scan-details/security-scan-result/security-scan-result-items/security-scan-result-item-details/security-scan-result-item-details.component';
import { StatusComponent } from './features/status/status.component';

// tslint:enable:max-line-length

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    accessToken: () => {
      return AuthService.accessToken();
    },
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    BillOfMaterialsComponent,
    BomGroupedLicenseModulesComponent,
    BomGroupedLicensesComponent,
    BomGroupedLicenseModulesDialogComponent,
    BomLicenseExceptionDetailsComponent,
    BomLicenseExceptionDetailsDialogComponent,
    BomLicenseExceptionsComponent,
    BomLicensesComponent,
    BomManualLicenseDetailsComponent,
    BomManualLicenseDetailsDialogComponent,
    BomManualLicensesComponent,
    BomSecurityExceptionComponent,
    BomSecurityExceptionDetailsComponent,
    BomSecurityExceptionDetailsDialogComponent,
    BomVulnerabilitiesComponent,
    DashboardComponent,
    FlexLayoutTypeComponent,
    FooterComponent,
    HeaderComponent,
    LicenseDetailsComponent,
    LicenseObligationComponent,
    LicenseScanResultComponent,
    LicenseScanResultItemDetailsComponent,
    LicenseScanResultItemsComponent,
    LicensesComponent,
    LicensesExceptionsComponent,
    ModuleSearchComponent,
    ObjectDetailsComponent,
    ObligationDetailsComponent,
    ObligationDetailsViewComponent,
    ObligationsComponent,
    OutputFormatComponent,
    OutputFormatTypeDetailsComponent,
    PackageManagerDetailsComponent,
    PackageManagersComponent,
    ProjectDetailsComponent,
    ProjectNotesComponent,
    ProjectNotesDetailsComponent,
    ProjectNotesDetailsDialogComponent,
    ProjectScanDetailsComponent,
    ProjectScansComponent,
    ProjectStatsComponent,
    ProjectStatusComponent,
    ProjectStatusNormalComponent,
    ProjectStatusTypeDetailsComponent,
    ProjectStatusTypesComponent,
    ProjectsComponent,
    SecurityScanResultComponent,
    SecurityScanResultItemDetailsComponent,
    SecurityScanResultItemsComponent,
    SideNavComponent,
    SigninComponent,
    SignupComponent,
    StatusComponent,
    SystemConfigurationComponent,
    TooltipsComponent,
    TooltipDetailsComponent,
    VulnerabilityStatusDeploymentTypesComponent,
    VulnerabilityStatusDeploymentTypesDetailsComponent,
  ],
  imports: [
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
        },
      },
    ),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    EntityStoreModule,
    BrowserModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormlyModule.forRoot({
      types: [{ name: 'flex-layout', component: FlexLayoutTypeComponent }],
    }),
    FormlyMaterialModule,
    LayoutModule,
    AppMaterialModule,
    NgxDatatableModule,
    AppComponentsModule,
    TrustHtmlModule,
    SafePipeModule,
    PrettyJsonModule,
    DashboardModule,
    AppServicesModule,
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
    NavService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (router: Router, authService: AuthService) => {
        return new AuthInterceptor(router, authService);
      },
      multi: true,
      deps: [Router, AuthService],
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppDialogComponent,
    BomLicenseExceptionDetailsDialogComponent,
    BomManualLicenseDetailsDialogComponent,
    BomSecurityExceptionDetailsDialogComponent,
    ProjectNotesDetailsDialogComponent,
    BomGroupedLicenseModulesDialogComponent,
  ],
})
export class AppModule {}
