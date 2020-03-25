import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BomLicenseExceptionDetailsDialogComponent } from '@app/features/bill-of-materials/bom-license-exceptions/bom-license-exception-details/bom-license-exception-details-dialog.component';
import { LicenseScanResultItem, ProjectApiService } from '@app/shared/api';
import { LicenseScanResultItemDatatableComponent } from '@app/shared/app-components/license-scan-result-item-datatable/license-scan-result-item-datatable.component';
import { BomGlobalFilterMessageService } from '@app/shared/services/BomGlobalFilterMessageService';
import { BomLicenseExceptionOperationMessageService } from '@app/shared/services/BomLicenseExceptionOperationMessageService';
import { MessageServiceBasePayload } from '@app/shared/services/MessageServiceBasePayload';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bom-licenses',
  templateUrl: './bom-licenses.component.html',
  styleUrls: ['./bom-licenses.component.scss'],
})
export class BomLicensesComponent implements OnInit, OnDestroy {
  constructor(
    private projectApiService: ProjectApiService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private messageService: BomLicenseExceptionOperationMessageService,
    private bomGlobalSearchFilterMessage: BomGlobalFilterMessageService,
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
  @ViewChild('datatable') datatable: LicenseScanResultItemDatatableComponent;
  projectId: string;
  selected = [];

  getPagedResults(query: any): Observable<any> {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    return this.projectApiService.projectIdBillOfMaterialsLicensesGet(
      this.bomGlobalSearchFilter,
      query.perPage || 50,
      query.page || 1,
      this.projectId,
    );
  }

  ngOnDestroy(): void {}

  ngOnInit() {}

  onDetectedLicenseClick(licenseScanResultItem: LicenseScanResultItem) {
    this.openDialog(licenseScanResultItem);
  }

  openDialog(licenseScanResultItem: LicenseScanResultItem) {
    const data: any = {
      project: { id: this.projectId },
    };

    data.licenseScanResultItem = licenseScanResultItem;

    this.dialog.open(BomLicenseExceptionDetailsDialogComponent, {
      minWidth: '512px',
      data,
    });
  }
}
