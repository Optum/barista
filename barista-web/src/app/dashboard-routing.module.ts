import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/features/auth/auth.guard';
import { DashboardComponent } from '@app/features/dashboard/dashboard.component';
import { LicenseObligationComponent } from '@app/features/license-obligation/license-obligation.component';
import { LicenseDetailsComponent } from '@app/features/licenses/license-details/license-details.component';
import { LicensesExceptionsComponent } from '@app/features/licenses/licenses-exceptions/licenses.exceptions.component';
import { LicensesComponent } from '@app/features/licenses/licenses.component';
import { ObligationDetailsComponent } from '@app/features/obligations/obligation-details/obligation-details.component';
import { ObligationsComponent } from '@app/features/obligations/obligations.component';
import { OutputFormatTypeDetailsComponent } from '@app/features/output-format/output-format-type-details/output-format-type-details.component';
import { OutputFormatComponent } from '@app/features/output-format/output-format.component';
import { PackageManagerDetailsComponent } from '@app/features/package-managers/package-manager-details/package-manager-details.component';
import { PackageManagersComponent } from '@app/features/package-managers/package-managers.component';
import { ProjectStatusTypeDetailsComponent } from '@app/features/project-status-types/project-status-type-details/project-status-type-details.component';
import { ProjectStatusTypesComponent } from '@app/features/project-status-types/project-status-types.component';
import { ProjectDetailsComponent } from '@app/features/projects/project-details/project-details.component';
import { LicenseScanResultItemDetailsComponent } from '@app/features/projects/project-scans/project-scan-details/license-scan-result/license-scan-result-items/license-scan-result-item-details/license-scan-result-item-details.component';
import { LicenseScanResultComponent } from '@app/features/projects/project-scans/project-scan-details/license-scan-result/license-scan-result.component';
import { ProjectScanDetailsComponent } from '@app/features/projects/project-scans/project-scan-details/project-scan-details.component';
import { SecurityScanResultItemDetailsComponent } from '@app/features/projects/project-scans/project-scan-details/security-scan-result/security-scan-result-items/security-scan-result-item-details/security-scan-result-item-details.component';
import { SecurityScanResultComponent } from '@app/features/projects/project-scans/project-scan-details/security-scan-result/security-scan-result.component';
import { SystemConfigurationComponent } from '@app/features/system-configuration/system-configuration.component';
import { TooltipDetailsComponent } from '@app/features/tooltips/tooltip-details/tooltip-details.component';
import { TooltipsComponent } from '@app/features/tooltips/tooltips.component';
import { VulnerabilityStatusDeploymentTypesDetailsComponent } from '@app/features/vulnerability-status-deployment-types/vulnerability-status-deployment-types-details/vulnerability-status-deployment-types-details.component';
import { VulnerabilityStatusDeploymentTypesComponent } from '@app/features/vulnerability-status-deployment-types/vulnerability-status-deployment-types.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'project',
        component: DashboardComponent,
      },
      {
        path: 'licenses',
        component: LicensesComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'obligations',
        component: ObligationsComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'package-managers',
        component: PackageManagersComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'package-manager/:packageManagerId',
        component: PackageManagerDetailsComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'output-format-type',
        component: OutputFormatComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'tooltip/:toolTipId',
        component: TooltipDetailsComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'sys-config',
        component: SystemConfigurationComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'output-format-type/:outputFormatTypeCode',
        component: OutputFormatTypeDetailsComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'project/:projectId',
        component: ProjectDetailsComponent,
      },
      {
        path: 'license/:licenseId',
        component: LicenseDetailsComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'obligation/:obligationId',
        component: ObligationDetailsComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'license-obligation',
        component: LicenseObligationComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'licenses-exceptions',
        component: LicensesExceptionsComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'project/:projectId/scan/:scanId',
        component: ProjectScanDetailsComponent,
        children: [
          {
            path: 'license-scan-result',
            component: LicenseScanResultComponent,
          },
          {
            path: 'security-scan-result',
            component: SecurityScanResultComponent,
          },
        ],
      },
      {
        path: 'project/:projectId/scan/:scanId/license-scan-result-item/:itemId',
        component: LicenseScanResultItemDetailsComponent,
      },
      {
        path: 'project/:projectId/scan/:scanId/security-scan-result-item/:itemId',
        component: SecurityScanResultItemDetailsComponent,
      },
      {
        path: 'project-status-types',
        component: ProjectStatusTypesComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'project-status-type/:projectStatusTypeId',
        component: ProjectStatusTypeDetailsComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'vulnerability-status-deployment-type',
        component: VulnerabilityStatusDeploymentTypesComponent,
        data: { isAdminRoute: true },
      },
      {
        path: 'vulnerability-status-deployment-type/:id',
        component: VulnerabilityStatusDeploymentTypesDetailsComponent,
        data: { isAdminRoute: true },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
