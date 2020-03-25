import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/features/auth/auth.service';
import { BomSecurityExceptionDetailsDialogComponent } from '@app/features/bill-of-materials/bom-security-exception/bom-security-exception-details/bom-security-exception-details-dialog.component';
import { BomSecurityException, BomSecurityExceptionApiService, Project } from '@app/shared/api';
import { ComponentWithMessage } from '@app/shared/app-components/ComponentWithMessage';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import IDataTableColumns from '@app/shared/interfaces/IDataTableColumns';
import { BomGlobalFilterMessageService } from '@app/shared/services/BomGlobalFilterMessageService';
import { BomSecurityExceptionOperationMessageService } from '@app/shared/services/BomSecurityExceptionOperationMessageService';
import { MessageServiceBasePayload } from '@app/shared/services/MessageServiceBasePayload';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bom-security-exception',
  templateUrl: './bom-security-exception.component.html',
  styleUrls: ['./bom-security-exception.component.scss'],
})
export class BomSecurityExceptionComponent extends ComponentWithMessage implements OnInit, OnDestroy {
  constructor(
    private service: BomSecurityExceptionApiService,
    public dialog: MatDialog,
    private messageService: BomSecurityExceptionOperationMessageService,
    private authService: AuthService,
    private bomGlobalSearchFilterMessage: BomGlobalFilterMessageService,
  ) {
    super();

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
  @ViewChild('datatableComponent') datatableComponent: AppDatatableComponent;
  @Input() project: Project = {} as Project;
  @ViewChild('removeRelationTemplate', { static: true }) removeRelationTemplate;
  selected = [];
  @ViewChild('statusTemplate', { static: true }) statusTemplate;

  getPagedResults(query: any): Observable<any> {
    if (!this.bomGlobalSearchFilter) {
      query.filter = `project.id||eq||${this.project.id}`;
      return this.service.bomSecurityExceptionGet(
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

    return this.service.bomSecurityExceptionSearchGet(
      query.perPage,
      query.page,
      this.bomGlobalSearchFilter,
      this.project.id,
    );
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    this.columns = [
      {
        flexGrow: 2,
        name: 'Package',
        prop: 'securityItemPath',
      },
      {
        flexGrow: 1,
        name: 'CVE-ID',
        prop: 'cveId',
      },
      {
        flexGrow: 3,
        name: 'Notes',
        prop: 'notes',
      },
      { name: 'Status', prop: 'projectScanStatus.code', flexGrow: 1, cellTemplate: this.statusTemplate },
    ];
  }

  onSelect({ selected }) {
    if (!this.authService.isAdmin) {
      return;
    }

    this.openDialog(selected[0]);
  }

  openDialog(bomSecurityException: BomSecurityException = null) {
    this.dialog.open(BomSecurityExceptionDetailsDialogComponent, {
      minWidth: '800px',
      data: {
        bomSecurityException,
        project: this.project,
        overrideSecurityItem: false,
      },
    });
  }
}
