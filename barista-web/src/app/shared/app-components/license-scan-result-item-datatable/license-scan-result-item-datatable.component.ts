import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@app/features/auth/auth.service';
import { LicenseScanResultItem, LicenseScanResultItemApiService } from '@app/shared/api';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import IDataTableColumns from '@app/shared/interfaces/IDataTableColumns';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-license-scan-result-item-datatable',
  templateUrl: './license-scan-result-item-datatable.component.html',
  styleUrls: ['./license-scan-result-item-datatable.component.scss'],
})
export class LicenseScanResultItemDatatableComponent implements OnInit {
  constructor(
    private licenseScanResultItemApiService: LicenseScanResultItemApiService,
    private authService: AuthService,
  ) {}

  @Input() allowLicenseOverride = false;
  columns: IDataTableColumns[] = [];
  @ViewChild('datatable') datatable: AppDatatableComponent;
  @Input() filter: string;
  @Input() getPagedResults: (query: any) => Observable<any>;
  @Input() onLicenseOverrideClick: (l: LicenseScanResultItem) => void;
  @Input() onSelect: (event: any) => void;
  @ViewChild('overrideTemplate', { static: true }) overrideTemplate;
  @Input() selected = [];
  @ViewChild('statusTemplate', { static: true }) statusTemplate;

  defaultGetPagedResults(query: any): Observable<any> {
    query.filter = this.filter;
    return this.licenseScanResultItemApiService.licenseScanResultItemGet(
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

  ngOnInit() {
    const columns: IDataTableColumns[] = [
      { name: 'Item', prop: 'displayIdentifier', flexGrow: 2 },
      { name: 'License', prop: 'license.name', flexGrow: 2 },
      { name: 'Publisher', prop: 'publisherName', flexGrow: 2 },
      { name: 'Url', prop: 'publisherUrl', flexGrow: 2 },
      { name: 'Email', prop: 'publisherEmail', flexGrow: 2 },
    ];

    if (this.allowLicenseOverride && this.authService.canOverrideLicenses) {
      columns.push({
        name: '#',
        flexGrow: 2,
        prop: '',
        cellTemplate: this.overrideTemplate,
      } as any);
    }

    columns.push({
      name: 'Status',
      prop: 'projectScanStatus.code',
      flexGrow: 1,
      cellTemplate: this.statusTemplate,
    });

    this.columns = columns;

    if (!this.getPagedResults) {
      this.getPagedResults = this.defaultGetPagedResults.bind(this);
    }
  }

  onOverrideButtonClick(event, item) {
    this.onLicenseOverrideClick(item);
  }

  onSelectInternal(event: any) {
    if (this.onSelect) {
      this.onSelect(event);
    }
  }

  refresh() {
    this.datatable.refresh();
  }
}
