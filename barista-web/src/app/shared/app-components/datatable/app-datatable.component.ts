import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Page } from '@app/shared/app-components/datatable/page.model';
import * as _ from 'lodash';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './app-datatable.component.html',
  styleUrls: ['./app-datatable.component.scss'],
})
export class AppDatatableComponent implements OnInit, OnDestroy {
  // tslint:enable:no-output-native

  constructor() {}

  cache: any = {};
  @Input() canSelectRow: (data: any) => boolean;
  @Input() columnMode;
  @Input() columns;

  externalPaging: boolean;
  @Input() extraClasses = [];
  @Input() footerHeight;

  @Input() getPageResults: (query: any) => Observable<any>;
  @Input() headerHeight;
  isLoading: boolean;

  @Input() isReadOnly = false;

  page = new Page();
  @Input() pageSize = 50;
  @Input() rowHeight;

  @Input() rows: Array<any>;
  @Input() scrollbarV;

  // tslint:disable:no-output-native
  @Output() select = new EventEmitter<any>();
  @Input() selected;
  @Input() selectionType;

  @Input() sorts: any;

  _checkSelectable(event) {
    return this.canSelectRow ? this.canSelectRow(event) : true;
  }

  _getTableClasses() {
    return ['material', 'striped', ...this.extraClasses];
  }

  /**
   * Pass through method for ngx-datatable (select) event
   * @param $event The event.
   */
  _onSelect($event) {
    if (!this.isReadOnly) {
      this.select.emit($event);
    }
  }

  _setPage(pageInfo) {
    // generic query for API service used in the app
    const query = {
      page: `${pageInfo.offset + 1}`,
      perPage: `${this.pageSize}`, // default page size, components can overwrite this
    };

    this.isLoading = true;
    this.getPageResults(query)
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        if (_.size(data.data)) {
          this.page.total = data.total; // total available records on server side
          this.page.pageCount = data.pageCount; // number of pages
          this.page.page = pageInfo.offset; // API service returns 1-based, datatable works with 0-index based
          this.rows = data.data;
        } else {
          this.page.total = 0;
          this.page.pageCount = 0;
          this.page.page = 0;
          this.rows = [];
        }
        this.isLoading = false;
      });
  }

  public getRowIndex(predicate: (row) => boolean): number {
    return _.findIndex(this.rows, row => predicate(row));
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    this.page.count = this.pageSize;
    this.page.page = 0;

    // If we have not set a getPageResults method, let's set externalPaging to false
    this.externalPaging = !!this.getPageResults;

    if (this.getPageResults) {
      this._setPage({ offset: 0 });
    }
  }

  public refresh() {
    this.rows = [];
    this._setPage({ offset: 0 });
  }
}
