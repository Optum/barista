import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/features/auth/auth.service';
import { BomLicenseExceptionDetailsDialogComponent } from '@app/features/bill-of-materials/bom-license-exceptions/bom-license-exception-details/bom-license-exception-details-dialog.component';
import { BomLicenseException, BomLicenseExceptionApiService } from '@app/shared/api';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import IDataTableColumns from '@app/shared/interfaces/IDataTableColumns';
import { BomGlobalFilterMessageService } from '@app/shared/services/BomGlobalFilterMessageService';
import { BomLicenseExceptionOperationMessageService } from '@app/shared/services/BomLicenseExceptionOperationMessageService';
import { MessageServiceBasePayload } from '@app/shared/services/MessageServiceBasePayload';
import * as _ from 'lodash';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bom-license-exceptions',
  templateUrl: './bom-license-exceptions.component.html',
  styleUrls: ['./bom-license-exceptions.component.scss'],
})
export class BomLicenseExceptionsComponent implements OnInit, OnDestroy {
  constructor(
    private bomLicenseExceptionApiService: BomLicenseExceptionApiService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private messageService: BomLicenseExceptionOperationMessageService,
    private bomGlobalSearchFilterMessage: BomGlobalFilterMessageService,
    private authService: AuthService,
  ) {
    this.messageService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.datatable.refresh();
      });

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

  @ViewChild('datatable', { static: false }) datatable: AppDatatableComponent;
  projectId: string;
  selected = [];
  @ViewChild('statusTemplate', { static: true }) statusTemplate;

  getPagedResults(query: any): Observable<any> {
    if (_.isEmpty(this.bomGlobalSearchFilter)) {
      query.filter = `project||eq||${this.projectId}`;
      return this.bomLicenseExceptionApiService.bomLicenseExceptionGet(
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

    return this.bomLicenseExceptionApiService.bomLicenseExceptionSearchGet(
      query.perPage,
      query.page,
      this.bomGlobalSearchFilter,
      +this.projectId,
    );
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    this.columns = [
      {
        name: 'Item',
        prop: 'licenseItemPath',
        flexGrow: 2,
      },
      {
        name: 'License',
        prop: 'license.code',
        flexGrow: 1,
      },
      {
        name: 'Notes',
        prop: 'notes',
        flexGrow: 3,
      },
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
    if (!this.authService.isAdmin) {
      return;
    }

    this.openDialog(selected[0]);
  }

  openDialog(licenseException: BomLicenseException = null) {
    const data: any = {
      project: { id: this.projectId },
    };

    if (licenseException) {
      data.licenseException = licenseException;
    }

    const dialogRef = this.dialog.open(BomLicenseExceptionDetailsDialogComponent, {
      minWidth: '512px',
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      // Refresh results
      if (result) {
        this.datatable.refresh();
      }
    });
  }
}
