import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GlobalSearchApiService, ModuleSearchParentRecordDto } from '@app/shared/api';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import * as _ from 'lodash';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-module-search',
  templateUrl: './module-search.component.html',
  styleUrls: ['./module-search.component.scss'],
})
export class ModuleSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private globalSearchService: GlobalSearchApiService) {}

  childrenRecordsColumns = [
    {
      name: 'Module Name',
      prop: 'entityName',
      flexGrow: 1,
    },
    {
      name: 'Creation Date',
      prop: 'entityCreationDate',
      flexGrow: 1,
    },
  ];
  @ViewChild('childrenRecordsDataTable')
  childrenRecordsDataTable: AppDatatableComponent;
  childrenRecordsSelected = [];

  moduleFilter = '';
  @ViewChild('moduleSearchInput')
  moduleSearchInput: ElementRef;

  parentRecordsColumns = [
    {
      name: 'Project Name',
      prop: 'projectName',
      flexGrow: 1,
    },
    {
      name: 'Project Description',
      prop: 'projectDescription',
      flexGrow: 2,
    },
    {
      name: 'Modules Count',
      prop: 'entityCount',
      flexGrow: 1,
    },
    {
      name: 'Git Url',
      prop: 'projectGitUrl',
      flexGrow: 2,
    },
    {
      name: 'Owner',
      prop: 'projectOwner',
      flexGrow: 1,
    },
    {
      name: 'Email',
      prop: 'projectEmail',
      flexGrow: 2,
    },
  ];
  @ViewChild('parentRecordsDataTable')
  parentRecordsDataTable: AppDatatableComponent;
  parentRecordsSelected = [];
  selectedProject: ModuleSearchParentRecordDto = null;

  getChildrenRecordsPagedResults(query: any) {
    if (!this.selectedProject || !this.moduleFilter) {
      return of([]);
    }

    return this.globalSearchService.globalSearchSearchModule2ProjectIdModulePartialNamePagePageSizeGet(
      query.perPage,
      query.page,
      this.moduleFilter,
      this.selectedProject.projectId,
    );
  }

  getParentRecordsPagedResults(query: any) {
    if (_.isEmpty(this.moduleFilter)) {
      return of([]);
    }

    return this.globalSearchService.globalSearchSearchModule1ModulePartialNamePagePageSizeGet(
      query.perPage,
      query.page,
      this.moduleFilter || 'array',
    );
  }

  ngAfterViewInit(): void {
    fromEvent(this.moduleSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter(res => res.length > 3 || res.length === 0),
        debounceTime(500),
        distinctUntilChanged(),
        untilDestroyed(this),
      )
      .subscribe((text: string) => {
        this.moduleFilter = text;
        this.parentRecordsDataTable.refresh();
        this.selectedProject = null;
        this.childrenRecordsDataTable.refresh();
      });
  }

  ngOnDestroy(): void {}

  ngOnInit() {}

  onSelectChildrenRecord({}) {}

  onSelectParentRecord({ selected: [selectedProject] }) {
    this.selectedProject = selectedProject;
    this.childrenRecordsDataTable.refresh();
  }

  resetSearchFilter() {
    this.moduleFilter = '';
    this.moduleSearchInput.nativeElement.value = '';
    this.selectedProject = null;
    this.parentRecordsDataTable.refresh();
    this.childrenRecordsDataTable.refresh();
  }
}
