import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/features/auth/auth.service';
import { BomManualLicenseDetailsDialogComponent } from '@app/features/bill-of-materials/bom-manual-licenses/bom-manual-license-details/bom-manual-license-details-dialog.component';
import { DeploymentTypeService } from '@app/shared/+state/deploymentType/deployment-type.service';
import { OutputFormatTypeService } from '@app/shared/+state/outputFormatType/output-format-type.service';
import { PackageManagerService } from '@app/shared/+state/packageManager/package-manager.service';
import { ProjectService } from '@app/shared/+state/project/project.service';
import { ProjectDevelopmentTypeService } from '@app/shared/+state/projectDevelopmentType/project-development-type.service';
import { ProjectStatusTypeService } from '@app/shared/+state/projectStatusType/project-status-type.service';
import { ScanService } from '@app/shared/+state/scan/scan.service';
import {
  BomManualLicense,
  BomManualLicenseApiService,
  DeploymentType,
  License,
  LicenseApiService,
  OutputFormatType,
  PackageManager,
  Project,
  ProjectApiService,
  ProjectDevelopmentType,
  ProjectDistinctLicenseDto,
  ProjectDistinctSeverityDto,
  ProjectDistinctVulnerabilityDto,
  ProjectStatusType,
  ScanApiService, SystemConfiguration,
} from '@app/shared/api';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import IBreadcrumb from '@app/shared/app-components/breadcrumbs/IBreadcrumb';
import { getDefaultValue } from '@app/shared/helpers';
import { compareLookupModels } from '@app/shared/helpers/lookup-model';
import { ProjectDetailsTabChangedMessageService } from '@app/shared/services/ProjectDetailsTabChangedMessageService';
import { ToolTipsCacheService } from '@app/shared/services/ToolTipsCacheService';
import * as _ from 'lodash';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { combineLatest, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import {SystemConfigurationService} from '@app/shared/+state/systemConfiguration/system-configuration.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private projectService: ProjectService,
    private scanApiService: ScanApiService,
    private scanService: ScanService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private packageManagerService: PackageManagerService,
    private outputFormatTypeService: OutputFormatTypeService,
    private deploymentTypeService: DeploymentTypeService,
    private projectDevelopmentTypeService: ProjectDevelopmentTypeService,
    private projectStatusTypeService: ProjectStatusTypeService,
    private projectApiService: ProjectApiService,
    private licenseApiService: LicenseApiService,
    private bomManualLicenseApiService: BomManualLicenseApiService,
    private authService: AuthService,
    private tabChangedMessageService: ProjectDetailsTabChangedMessageService,
    private toolTipsCacheService: ToolTipsCacheService,
    private systemConfigService: SystemConfigurationService,
  ) {
    this.projectStatusType$ = this.projectStatusTypeService.entities$;
    this.outputFormatType$ = this.outputFormatTypeService.entities$;
    this.packageManagers$ = this.packageManagerService.entities$;
    this.deploymentType$ = this.deploymentTypeService.entities$;
    this.projectDevelopmentType$ = this.projectDevelopmentTypeService.entities$;
  }

  breadcrumbs: IBreadcrumb[];
  compareLookupModels = compareLookupModels;
  defaultManualLicense: BomManualLicense;
  deploymentType$: Observable<OutputFormatType[]>;
  isProjectOwner = false;
  licenseData$: Observable<ProjectDistinctLicenseDto[]>;
  licenses$: Observable<License[]>;
  manualLicenses$: Observable<BomManualLicense[]>;
  newProject = false;
  outputFormatType$: Observable<OutputFormatType[]>;
  packageManagers$: Observable<PackageManager[]>;
  project: Project;
  projectDevelopmentType$: Observable<OutputFormatType[]>;
  projectId = null;
  projectStatusType$: Observable<ProjectStatusType[]>;
  selectedTabIndex?: number;
  severityData$: Observable<ProjectDistinctSeverityDto[]>;
  tooltips = null;
  vulnerabilityData$: Observable<ProjectDistinctVulnerabilityDto[]>;
  systemConfiguration: Observable<SystemConfiguration>;

  addManualLicense() {
    if (this.project.name && this.project.currentVersion) {
      const manualLicense = {} as BomManualLicense;

      manualLicense.productName = this.project.name;
      manualLicense.productVersion = this.project.currentVersion;

      const data: any = {
        project: { id: this.projectId },
        manualLicense,
        prePopulatedProductName: true,
        prePopulatedProductVersion: true,
        isDefaultLicense: true,
      };

      const dialogRef = this.dialog.open(BomManualLicenseDetailsDialogComponent, {
        minWidth: '512px',
        data,
      });

      dialogRef.afterClosed().subscribe(() => {
        // Refresh results
        this.refreshManualLicenses();
      });
    } else {
      alert('Please add a project name and version before configuring a license.');
    }
  }

  afterOptionValuesLoaded({
    packageManagerCode = null,
    projectStatusCode = null,
    outputFormatCode = null,
    deploymentTypeCode = null,
    projectDevelopmentTypeCode = null,
  } = {}) {
    this.setupBreadcrumbs();

    combineLatest([
      this.projectStatusTypeService.entities$,
      this.outputFormatTypeService.entities$,
      this.packageManagerService.entities$,
      this.deploymentTypeService.entities$,
      this.projectDevelopmentTypeService.entities$,
    ])
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        if (_.every(result, r => _.size(r))) {
          this.project.projectStatus = getDefaultValue(result[0], projectStatusCode) as ProjectStatusType;
          this.project.outputFormat = getDefaultValue(result[1], outputFormatCode) as OutputFormatType;
          this.project.packageManager = getDefaultValue(result[2], packageManagerCode) as PackageManager;
          this.project.deploymentType = getDefaultValue(result[3], deploymentTypeCode) as DeploymentType;
          this.project.developmentType = getDefaultValue(
            result[4],
            projectDevelopmentTypeCode,
          ) as ProjectDevelopmentType;
        }
      });
  }

  ngOnDestroy(): void {}

  async ngOnInit() {

    this.systemConfiguration = this.systemConfigService.apiService.systemConfigurationIdGet('default');


    this.licenses$ = this.licenseApiService.licenseGet();
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.toolTipsCacheService
      // can't use ProjectDetailsComponent.name, after minification this name is no more relevant.
      .getToolTipsForPage('ProjectDetailsComponent')
      .pipe(untilDestroyed(this))
      .subscribe(tooltips => {
        this.tooltips = tooltips;
      });

    if (this.projectId === 'new') {
      this.newProject = true;
      this.projectId = null;
    } else {
      this.projectId = Number(this.projectId);
    }

    this.projectStatusTypeService.getAll();
    this.outputFormatTypeService.getAll();
    this.packageManagerService.getAll();
    this.deploymentTypeService.getAll();
    this.projectDevelopmentTypeService.getAll();

    if (this.newProject) {
      const { userInfo } = this.authService;
      this.project = {
        outputEmail: userInfo.email,
        owner: userInfo.displayName,
        userId: userInfo.id,
      } as Project;
      this.afterOptionValuesLoaded();
    } else {
      this.projectService.setFilter(this.projectId); // ngrx entity data service and entity service
      this.projectService.filteredEntities$ // subscribe to observables, look at entity-metadata.ts
        .pipe(untilDestroyed(this))
        .subscribe(projects => {
          // unsubscribe, subscribe is async, can be called a lot
          if (projects.length > 0) {
            this.project = { ...projects[0] };

            this.setProjectDetailVisibility();

            this.licenseData$ = this.projectService.apiService.projectIdStatsLicensesGet(`${this.project.id}`);

            this.vulnerabilityData$ = this.projectService.apiService.projectIdStatsVulnerabilitiesGet(
              `${this.project.id}`,
            );

            this.severityData$ = this.projectService.apiService.projectIdStatsSeveritiesGet(`${this.project.id}`);

            this.afterOptionValuesLoaded({
              packageManagerCode: this.project.packageManager.code,
              outputFormatCode: this.project.outputFormat.code,
              projectStatusCode: this.project.projectStatus.code,
              deploymentTypeCode: this.project.deploymentType.code,
              projectDevelopmentTypeCode: this.project.developmentType.code,
            });

            this.refreshManualLicenses();
          } else {
            if (this.projectId) {
              this.projectService.getByKey(this.projectId);
            }
          }
        });
    }

    this.route.queryParams.subscribe(queryParams => {
      this.selectedTabIndex = queryParams.tab;
    });
  }

  onSubmit() {
    if (this.newProject) {
      this.projectApiService
        .projectPost(this.project)
        .pipe(first())
        .subscribe(
          project => {
            this.project = { ...project };

            this.newProject = false;

            this.snackBar.open(`Project ${project.name}`, 'OK', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });

            this.setupBreadcrumbs();

            return this.router.navigate(['/project', project.id]);
          },
          error => {
            this.dialog.open(AppDialogComponent, {
              data: { title: 'Error', message: JSON.stringify(error) },
            });
          },
        );
    } else {
      this.projectService
        .update(this.project)
        .pipe(first())
        .subscribe(
          project => {
            this.project = { ...project };

            this.snackBar.open(`Project ${project.name}`, 'OK', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
          error => {
            this.dialog.open(AppDialogComponent, {
              data: { title: 'Error', message: JSON.stringify(error) },
            });
          },
        );
    }
  }

  onTabChanged(ev) {
    const {
      index,
      tab: { textLabel: title },
    } = ev;

    this.tabChangedMessageService.send({ tabIndex: index, tabTitle: title });
  }

  refreshManualLicenses() {
    this.manualLicenses$ = this.bomManualLicenseApiService
      .bomManualLicenseGet(
        null,
        `project||eq||${this.project.id}`,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      )
      .pipe(untilDestroyed(this));

    this.manualLicenses$.subscribe(items => {
      const result = items.filter(item => item.isDefault === true);

      if (result && result.length > 0) {
        this.defaultManualLicense = result[0];
      }
    });
  }

  setProjectDetailVisibility() {
    if (this.project) {
      this.isProjectOwner = this.authService.isProjectOwner(this.project);
    }
  }

  setupBreadcrumbs() {
    this.breadcrumbs = [
      {
        url: '/project',
        title: 'Projects',
      },
      {
        url: '',
        title: this.project && this.project.name ? this.project.name : '*New Project',
      },
    ];
  }
}
