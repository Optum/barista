import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { License, LicenseApiService, ObligationApiService } from '@app/shared/api';
import { ComponentWithMessage } from '@app/shared/app-components/ComponentWithMessage';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-license-obligation',
  templateUrl: './license-obligation.component.html',
  styleUrls: ['./license-obligation.component.scss'],
})
export class LicenseObligationComponent extends ComponentWithMessage implements OnInit, AfterViewInit, OnDestroy {
  constructor(private licenseApiService: LicenseApiService, private obligationApiService: ObligationApiService) {
    super();
  }

  allLicencesColumns = [{ name: 'Name', prop: 'name', flexGrow: 1 }, { name: 'Code', prop: 'code', flexGrow: 1 }];
  allObligationsColumns = [];
  @ViewChild('allObligationsDataTable') allObligationsDataTable: AppDatatableComponent;
  associatedObligationsColumns = [];
  @ViewChild('associatedObligationsDataTable') associatedObligationsDataTable: AppDatatableComponent;
  @ViewChild('associateObligationTemplate', { static: true }) associateObligationTemplate;
  isBusy: boolean;
  licenseFilter = '';
  @ViewChild('licensesDataTable') licensesDataTable: AppDatatableComponent;
  @ViewChild('licenseSearchInput') licenseSearchInput: ElementRef;
  obligationsFilter = '';
  @ViewChild('obligationsSearchInput') obligationsSearchInput: ElementRef;
  @ViewChild('removeObligationAssociationTemplate', { static: true }) removeObligationAssociationTemplate;
  selectedAssociatedObligations = [];
  selectedLicense: License = null;
  selectedLicenses = [];
  selectedObligations = [];

  getAllObligationsPagedResults(query: any): Observable<any> {
    return this.obligationApiService.obligationSearchGet(query.perPage, query.page, this.obligationsFilter);
  }

  getAssociatedObligationsPagedResults(query: any): Observable<any> {
    if (!this.selectedLicense) {
      return of([]);
    }

    return this.licenseApiService.licenseObligationsGet(query.perPage, query.page, this.selectedLicense.code);
  }

  getLicensesPagedResults(query: any): Observable<any> {
    return this.licenseApiService.licenseSearchGet(query.perPage, query.page, this.licenseFilter);
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
        this.associatedObligationsDataTable.refresh();
        this.selectedLicenses = [];
      });
    fromEvent(this.obligationsSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter(res => res.length > 2 || res.length === 0),
        debounceTime(500),
        distinctUntilChanged(),
        untilDestroyed(this),
      )
      .subscribe((text: string) => {
        this.obligationsFilter = text;
        this.allObligationsDataTable.refresh();
      });
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    this.allObligationsColumns = [
      { name: 'Name', prop: 'name', flexGrow: 1 },
      { name: 'Description', prop: 'desc', flexGrow: 5 },
      { name: '#', prop: 'action', flexGrow: 3, cellTemplate: this.associateObligationTemplate },
    ];

    this.associatedObligationsColumns = [
      { name: 'Name', prop: 'name', flexGrow: 1 },
      { name: '#', prop: null, flexGrow: 1, cellTemplate: this.removeObligationAssociationTemplate },
    ];
  }

  async onAssociateObligationClick(event, row) {
    this.isBusy = true;
    const res = await this.obligationApiService
      .obligationAssociateToLicensePost({
        licenseCode: this.selectedLicense.code,
        obligationCode: row.code,
      })
      .toPromise();

    if (res) {
      this.showMessage('Association successfully created.');
    } else {
      this.showMessage('No association was created.');
    }

    this.isBusy = false;
    this.associatedObligationsDataTable.refresh();
  }

  async onAssociateObligationToAllLicensesByFilter(event, row) {
    const totalLicenses = this.licensesDataTable.page.total;
    if (!confirm(`Are you sure you want to associate the obligation to ${totalLicenses} licences?`)) {
      return;
    }

    this.isBusy = true;
    const createdRecords = await this.licenseApiService
      .licenseAssociateObligationToLicencesByFilterPost({
        code: row.code,
        filter: this.licenseFilter,
      })
      .toPromise();

    if (createdRecords) {
      this.showMessage(`Created ${createdRecords} associations.`);
    } else {
      this.showMessage('No associations were created.');
    }

    this.isBusy = false;
    this.associatedObligationsDataTable.refresh();
  }

  async onDeleteAssociationClick(event, row) {
    this.isBusy = true;
    const res = await this.obligationApiService
      .obligationDeleteFromLicensePost({
        licenseCode: this.selectedLicense.code,
        obligationCode: row.code,
      })
      .toPromise();

    if (res) {
      this.showMessage(`Association successfully deleted.`);
    } else {
      this.showMessage(`No association was deleted.`);
    }

    this.isBusy = false;
    this.associatedObligationsDataTable.refresh();
  }

  async onDeleteObligationFromAllLicensesByFilter(event, row) {
    const totalLicenses = this.licensesDataTable.page.total;
    if (!confirm(`Are you sure you want to delete the obligation from ${totalLicenses} licences?`)) {
      return;
    }

    this.isBusy = true;
    const deletedRecords = await this.licenseApiService
      .licenseDeleteObligationFromLicencesByFilterPost({
        code: row.code,
        filter: this.licenseFilter,
      })
      .toPromise();

    if (deletedRecords) {
      this.showMessage(`Deleted ${deletedRecords} associations.`);
    } else {
      this.showMessage(`No associations were deleted.`);
    }

    this.isBusy = false;
    this.associatedObligationsDataTable.refresh();
  }

  onLicenseSelect(event) {
    this.selectedLicense = event.selected[0];
    this.associatedObligationsDataTable.refresh();
  }
}
