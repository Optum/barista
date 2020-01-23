import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/features/auth/auth.service';

import { BomSecurityExceptionDetailsDialogComponent } from '@app/features/bill-of-materials/bom-security-exception/bom-security-exception-details/bom-security-exception-details-dialog.component';
import { ProjectApiService, SecurityScanResultItem } from '@app/shared/api';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import IDataTableColumns from '@app/shared/interfaces/IDataTableColumns';
import { BomGlobalFilterMessageService } from '@app/shared/services/BomGlobalFilterMessageService';
import { BomSecurityExceptionOperationMessageService } from '@app/shared/services/BomSecurityExceptionOperationMessageService';
import { MessageServiceBasePayload } from '@app/shared/services/MessageServiceBasePayload';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bom-vulnerabilities',
  templateUrl: './bom-vulnerabilities.component.html',
  styleUrls: ['./bom-vulnerabilities.component.scss'],
})
export class BomVulnerabilitiesComponent implements OnInit, OnDestroy {
  constructor(
    private projectApiService: ProjectApiService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private messageService: BomSecurityExceptionOperationMessageService,
    private bomGlobalSearchFilterMessage: BomGlobalFilterMessageService,
    private authService: AuthService,
  ) {
    this.messageService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.datatableComponent.refresh();
      });

    this.bomGlobalSearchFilterMessage
      .get()
      .pipe(untilDestroyed(this))
      .subscribe((data: MessageServiceBasePayload<string>) => {
        this.bomGlobalSearchFilter = data.payload;
        this.datatableComponent.refresh();
      });
  }

  bomGlobalSearchFilter = '';
  columns: IDataTableColumns[];
  @ViewChild('datatableComponent', { static: false }) datatableComponent: AppDatatableComponent;
  @ViewChild('overrideTemplate', { static: true }) overrideTemplate;
  project: string;
  selected = [];
  @ViewChild('statusTemplate', { static: true }) statusTemplate;

  getPagedResults(query: any): Observable<any> {
    this.project = this.route.snapshot.paramMap.get('projectId');
    return this.projectApiService.projectIdBillOfMaterialsVulnerabilitiesGet(
      this.bomGlobalSearchFilter,
      query.perPage || 50,
      query.page || 1,
      this.project,
    );
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    this.columns = [
      { name: 'Package', prop: 'path', flexGrow: 2 },
      { name: 'CVE-ID', prop: 'displayIdentifier', flexGrow: 2 },
      { name: 'Description', prop: 'description', flexGrow: 3 },
    ];

    if (this.authService.canOverrideVulnerabilities) {
      this.columns.push({ name: '#', cellTemplate: this.overrideTemplate, flexGrow: 1, prop: '' });
    }

    this.columns.push({
      name: 'Status',
      prop: 'projectScanStatus.code',
      flexGrow: 1,
      cellTemplate: this.statusTemplate,
    });
  }

  onOverrideButtonClick(event, row) {
    this.openDialog(row);
  }

  onSelect() {}

  openDialog(securityScanResultItem: SecurityScanResultItem = null) {
    this.dialog.open(BomSecurityExceptionDetailsDialogComponent, {
      minWidth: '800px',
      data: {
        bomSecurityItem: securityScanResultItem,
        project: this.project,
        overrideSecurityItem: true,
      },
    });
  }
}
