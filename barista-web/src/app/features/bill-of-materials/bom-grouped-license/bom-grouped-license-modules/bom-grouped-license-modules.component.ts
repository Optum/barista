import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@app/features/auth/auth.service';
import { BomLicenseExceptionDetailsDialogComponent } from '@app/features/bill-of-materials/bom-license-exceptions/bom-license-exception-details/bom-license-exception-details-dialog.component';
import { LicenseDto, LicenseModuleDto, ProjectApiService } from '@app/shared/api';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import { BomLicenseExceptionOperationMessageService } from '@app/shared/services/BomLicenseExceptionOperationMessageService';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-bom-grouped-license-modules',
  templateUrl: './bom-grouped-license-modules.component.html',
  styleUrls: ['./bom-grouped-license-modules.component.scss'],
})
export class BomGroupedLicenseModulesComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private projectApiService: ProjectApiService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BomGroupedLicenseModulesComponent>,
    private messageService: BomLicenseExceptionOperationMessageService,
  ) {
    messageService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  columns = [];
  @ViewChild('datatable') datatable: AppDatatableComponent;
  filter = '';
  @Input() licenseDto: LicenseDto;
  @ViewChild('overrideTemplate', { static: true }) overrideTemplate;
  @Input() projectId: number;
  @ViewChild('searchInput') searchInput: ElementRef;
  selected = [];
  @ViewChild('statusTemplate', { static: true }) statusTemplate;

  clearSearchField() {
    this.filter = '';
    this.datatable.refresh();
  }

  getPagedResults(query: any): Observable<any> {
    return this.projectApiService.projectIdBillOfMaterialsModulesFromLicenseLicenseIdGet(
      this.filter,
      query.perPage,
      query.page,
      this.licenseDto.id,
      this.projectId.toString(),
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.datatable.refresh();
    }, 500);

    if (this.searchInput) {
      fromEvent(this.searchInput.nativeElement, 'input')
        .pipe(
          map((event: any) => event.target.value),
          filter(res => res.length > 2 || res.length === 0),
          debounceTime(500),
          distinctUntilChanged(),
          untilDestroyed(this),
        )
        .subscribe((text: string) => {
          this.datatable.refresh();
        });
    }
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    const columns = [
      { name: 'Item', prop: 'modulePath', flexGrow: 2 },
      { name: 'Publisher', prop: 'publisherName', flexGrow: 2 },
      { name: 'Url', prop: 'publisherUrl', flexGrow: 2 },
      { name: 'Email', prop: 'publisherEmail', flexGrow: 2 },
    ];

    if (this.authService.canOverrideLicenses) {
      columns.push({
        name: '#',
        flexGrow: 2,
        prop: '',
        cellTemplate: this.overrideTemplate,
      } as any);
    }

    columns.push({
      name: 'Status',
      prop: 'scanCode',
      flexGrow: 1,
      cellTemplate: this.statusTemplate,
    } as any);

    this.columns = columns;
  }

  onOverrideButtonClick(event, item: LicenseModuleDto) {
    const data: any = {
      project: { id: this.projectId },
    };

    data.licenseScanResultItem = {
      displayIdentifier: item.modulePath,
      projectScanStatus: {
        code: item.scanCode,
      },
      license: {
        id: this.licenseDto.id,
        name: this.licenseDto.name,
      },
    };

    this.dialog.open(BomLicenseExceptionDetailsDialogComponent, {
      minWidth: '512px',
      data,
    });
  }

  onSelect({ selected }) {}
}
