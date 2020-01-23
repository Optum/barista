// tslint:disable:max-line-length
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BomGroupedLicenseModulesDialogComponent } from '@app/features/bill-of-materials/bom-grouped-license/bom-grouped-license-modules/bom-grouped-license-modules.dialog.component';
import { LicenseDto, ProjectApiService } from '@app/shared/api';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import { BomGlobalFilterMessageService } from '@app/shared/services/BomGlobalFilterMessageService';
import { BomLicenseExceptionOperationMessageService } from '@app/shared/services/BomLicenseExceptionOperationMessageService';
import { MessageServiceBasePayload } from '@app/shared/services/MessageServiceBasePayload';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

// tslint:enabled:max-line-length

@Component({
  selector: 'app-bom-grouped-licenses',
  templateUrl: './bom-grouped-licenses.component.html',
  styleUrls: ['./bom-grouped-licenses.component.scss'],
})
export class BomGroupedLicensesComponent implements OnInit, OnDestroy {
  constructor(
    private projectApiService: ProjectApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private bomGlobalSearchFilterMessage: BomGlobalFilterMessageService,
    private messageService: BomLicenseExceptionOperationMessageService,
  ) {
    this.bomGlobalSearchFilterMessage
      .get()
      .pipe(untilDestroyed(this))
      .subscribe((data: MessageServiceBasePayload<string>) => {
        this.bomGlobalSearchFilter = data.payload;
        this.datatable.refresh();
      });
    this.messageService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.datatable.refresh();
      });
  }

  bomGlobalSearchFilter = '';
  columns = [{ flexGrow: 4, name: 'Name', prop: 'name' }, { flexGrow: 1, name: 'Modules Count', prop: 'modulesCount' }];
  @ViewChild('datatable', { static: false }) datatable: AppDatatableComponent;
  projectId: string;
  selected = [];

  getPagedResults(query: any): Observable<any> {
    return this.projectApiService.projectIdBillOfMaterialsLicensesOnlyGet(
      this.bomGlobalSearchFilter,
      query.perPage,
      query.page,
      this.projectId,
    );
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
  }

  onSelect({ selected }) {
    const licenseDto = selected[0] as LicenseDto;
    this.dialog.open(BomGroupedLicenseModulesDialogComponent, {
      minWidth: '1024px',
      maxHeight: '800px',
      height: '800px',
      data: {
        licenseDto,
        projectId: this.projectId,
      },
    });
  }
}
