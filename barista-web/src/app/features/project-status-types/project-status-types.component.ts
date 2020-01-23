import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectStatusTypeApiService } from '@app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-status-types',
  templateUrl: './project-status-types.component.html',
  styleUrls: ['./project-status-types.component.scss'],
})
export class ProjectStatusTypesComponent implements OnInit, OnDestroy {
  constructor(private projectStatusTypeApiService: ProjectStatusTypeApiService, private router: Router) {}

  columns = [{ name: 'Code', prop: 'code', flexGrow: 1 }, { name: 'Description', prop: 'description', flexGrow: 1 }];
  selected = [];

  getPagedResults(query: any): Observable<any> {
    return this.projectStatusTypeApiService.projectStatusTypeGet(
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

  ngOnDestroy(): void {}

  ngOnInit() {}

  onSelect({ selected }) {
    return this.router.navigate(['project-status-type', selected[0].code]);
  }
}
