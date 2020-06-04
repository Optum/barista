import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { BomManualLicenseDetailsDialogComponent } from '@app/features/bill-of-materials/bom-manual-licenses/bom-manual-license-details/bom-manual-license-details-dialog.component';
import { ProjectService } from '@app/shared/+state/project/project.service';
import { BomManualLicense, BomManualLicenseApiService } from '@app/shared/api';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import IDataTableColumns from '@app/shared/interfaces/IDataTableColumns';
import { BomGlobalFilterMessageService } from '@app/shared/services/BomGlobalFilterMessageService';
import { MessageServiceBasePayload } from '@app/shared/services/MessageServiceBasePayload';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bom-manual-licenses',
  templateUrl: './bom-manual-licenses.component.html',
  styleUrls: ['./bom-manual-licenses.component.scss'],
})
export class BomManualLicensesComponent implements OnInit, OnDestroy {
  constructor(
    private bomManualLicenseApiService: BomManualLicenseApiService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private bomGlobalSearchFilterMessage: BomGlobalFilterMessageService,
  ) {
    this.bomGlobalSearchFilterMessage
      .get()
      .pipe(untilDestroyed(this))
      .subscribe((data: MessageServiceBasePayload<string>) => {
        this.bomGlobalSearchFilter = data.payload;
        this.datatable.refresh();
      });
  }

  bomGlobalSearchFilter = '';
  columns: IDataTableColumns[] = [];

  @ViewChild('datatable') datatable: AppDatatableComponent;

  projectId: string;
  selected = [];

  @ViewChild('statusTemplate', { static: true }) statusTemplate;

  getPagedResults(query: any): Observable<any> {
    query.filter = `project.id||eq||${this.projectId}`;

    if (!this.bomGlobalSearchFilter) {
      return this.bomManualLicenseApiService.bomManualLicenseGet(
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

    return this.bomManualLicenseApiService.bomManualLicenseSearchGet(
      query.perPage,
      query.page,
      this.bomGlobalSearchFilter,
      +this.projectId,
    );
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    this.columns = [
      { name: 'Product Name', prop: 'productName', flexGrow: 2 },
      { name: 'Version', prop: 'productVersion', flexGrow: 2 },
      { name: 'URL', prop: 'referenceUrl', flexGrow: 2 },
      {
        name: 'Status',
        prop: 'projectScanStatus.code',
        flexGrow: 1,
        cellTemplate: this.statusTemplate,
      },
    ];

    this.projectId = this.route.snapshot.paramMap.get('projectId');
  }

  onNew() {
    this.openDialog();
  }

  onSelect({ selected }) {
    this.openDialog(selected[0]);
  }

  openDialog(manualLicense: BomManualLicense = null) {
    const data: any = {
      project: { id: this.projectId },
    };

    if (manualLicense) {
      data.manualLicense = manualLicense;
    }

    const dialogRef = this.dialog.open(BomManualLicenseDetailsDialogComponent, {
      minWidth: '512px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Refresh results
      this.datatable.refresh();
    });
  }
}
