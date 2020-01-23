import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DeploymentTypeService } from '@app/shared/+state/deploymentType/deployment-type.service';
import { ProjectScanStatusTypeService } from '@app/shared/+state/projectScanStatusType/project-scan-status-type.service';
import {
  DeploymentType,
  License,
  LicenseApiService,
  LicenseStatusDeploymentType,
  LicenseStatusDeploymentTypeApiService,
  LicenseStatusDeploymentTypeUpsertDto,
  ProjectScanStatusType,
} from '@app/shared/api';
import { ComponentWithMessage } from '@app/shared/app-components/ComponentWithMessage';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import { compareLookupModels } from '@app/shared/helpers/lookup-model';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-licenses-exceptions',
  templateUrl: './licenses.exceptions.component.html',
  styleUrls: ['./licenses.exceptions.component.scss'],
})
export class LicensesExceptionsComponent extends ComponentWithMessage implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private licenseApiService: LicenseApiService,
    private deploymentTypeService: DeploymentTypeService,
    private licenseStatusDeploymentApiService: LicenseStatusDeploymentTypeApiService,
    private projectScanStatusTypeService: ProjectScanStatusTypeService,
  ) {
    super();
  }

  allLicencesColumns = [
    { name: 'Name', prop: 'name', flexGrow: 1 },
    { name: 'Code', prop: 'code', flexGrow: 1 },
    { name: 'Description', prop: 'desc', flexGrow: 3 },
  ];
  compareLookupModels = compareLookupModels;
  deploymentTypes$: Observable<DeploymentType[]>;
  isBusy = false;
  licenseFilter = '';
  @ViewChild('licensesDataTable', { static: false }) licensesDataTable: AppDatatableComponent;
  @ViewChild('licenseSearchInput', { static: false }) licenseSearchInput: ElementRef;
  licenseStatusDeploymentTypeColumns = [];
  @ViewChild('licenseStatusDeploymentTypeDataTable', { static: false })
  licenseStatusDeploymentTypeDataTable: AppDatatableComponent;
  projectScanStatusTypes$: Observable<ProjectScanStatusType[]>;
  @ViewChild('removeLicenseExceptionTemplate', { static: true }) removeLicenseExceptionTemplate;
  selectedDeploymentType: DeploymentType;
  selectedLicense: License = null;
  selectedLicenses: License[] = [];
  selectedLicenseStatusDeploymentTypes: LicenseStatusDeploymentType[] = [];
  selectedProjectScanStatusType: ProjectScanStatusType;

  async addExceptionToSelectedLicense() {
    const result: boolean = await this.licenseStatusDeploymentApiService
      .licenseStatusDeploymentTypeUpsertPost({
        deploymentTypeCode: this.selectedDeploymentType.code,
        scanStatusCode: this.selectedProjectScanStatusType.code,
        licenseCode: this.selectedLicense.code,
      } as LicenseStatusDeploymentTypeUpsertDto)
      .toPromise();

    this.showMessage(result ? 'An exceptions has been successfully created.' : 'Failed to create the exception.');
    this.licenseStatusDeploymentTypeDataTable.refresh();
  }

  getLicensesPagedResults(query: any): Observable<any> {
    return this.licenseApiService.licenseSearchGet(query.perPage, query.page, this.licenseFilter);
  }

  getLicensesStatusDeploymentTypesPagedResults(query: any): Observable<any> {
    if (!this.selectedLicense) {
      return of([]);
    }

    query.filter = `license.code||eq||${this.selectedLicense.code}`;
    return this.licenseStatusDeploymentApiService.licenseStatusDeploymentTypeGet(
      query.fields,
      query.filter,
      query.or,
      query.sort,
      query.join,
      query.perPage,
      query.offset,
      query.page,
      query.cache,
    );
  }

  ngAfterViewInit(): void {
    fromEvent(this.licenseSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter(res => res.length > 2 || res.length === 0),
        debounceTime(500),
        distinctUntilChanged(),
        untilDestroyed(this),
      )
      .subscribe((text: string) => {
        this.licenseFilter = text;
        this.licensesDataTable.refresh();
        this.selectedLicense = null;
        this.selectedLicenses = [];
        this.licenseStatusDeploymentTypeDataTable.refresh();
      });
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.licenseStatusDeploymentTypeColumns = [
      { name: 'License', prop: 'license.name', flexGrow: 1 },
      { name: 'Deployment Type', prop: 'deploymentType.description', flexGrow: 1 },
      { name: 'Status', prop: 'projectScanStatus.description', flexGrow: 1 },
      { name: '#', prop: 'action', flexGrow: 1, cellTemplate: this.removeLicenseExceptionTemplate },
    ];

    this.deploymentTypes$ = this.deploymentTypeService.entities$;
    this.projectScanStatusTypes$ = this.projectScanStatusTypeService.entities$;

    this.deploymentTypeService.getAll();
    this.projectScanStatusTypeService.getAll();
  }

  async onAddExceptionToAllLicenses() {
    if (!confirm(`Are you sure you want to add the exception to ${this.licensesDataTable.page.total} licenses?`)) {
      return;
    }

    const cnt = await this.licenseStatusDeploymentApiService
      .licenseStatusDeploymentTypeAddToLicensesPost({
        licenseFilter: this.licenseFilter,
        scanStatusCode: this.selectedProjectScanStatusType.code,
        deploymentTypeCode: this.selectedDeploymentType.code,
      } as LicenseStatusDeploymentTypeUpsertDto)
      .toPromise();
    this.showMessage(`Created ${cnt} exceptions.`);
    this.licenseStatusDeploymentTypeDataTable.refresh();
  }

  async onDeleteExceptionClick(event, row: LicenseStatusDeploymentType) {
    if (!confirm('Are you sure?')) {
      return;
    }

    const result = await this.licenseStatusDeploymentApiService
      .licenseStatusDeploymentTypeDeletePost({
        licenseCode: row.license.code,
        deploymentTypeCode: row.deploymentType.code,
        scanStatusCode: row.projectScanStatus.code,
      } as LicenseStatusDeploymentTypeUpsertDto)
      .toPromise();

    this.showMessage(result ? 'Exception successfully deleted.' : 'Exception could not be deleted.');
    this.licenseStatusDeploymentTypeDataTable.refresh();
  }

  async onDeleteFromAllLicenses() {
    if (!confirm(`Are you sure you want to delete the exception from ${this.licensesDataTable.page.total} licenses?`)) {
      return;
    }

    const cnt = await this.licenseStatusDeploymentApiService
      .licenseStatusDeploymentTypeDeleteFromLicensesPost({
        licenseFilter: this.licenseFilter,
        scanStatusCode: this.selectedProjectScanStatusType.code,
        deploymentTypeCode: this.selectedDeploymentType.code,
      } as LicenseStatusDeploymentTypeUpsertDto)
      .toPromise();
    this.showMessage(`Deleted ${cnt} exceptions.`);
    this.licenseStatusDeploymentTypeDataTable.refresh();
  }

  onLicenseSelect(event) {
    this.selectedLicense = event.selected[0];
    this.licenseStatusDeploymentTypeDataTable.refresh();
  }
}
