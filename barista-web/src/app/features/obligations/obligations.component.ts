import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObligationApiService, Project, ProjectApiService } from '@app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-obligations',
  templateUrl: './obligations.component.html',
  styleUrls: ['./obligations.component.scss'],
})
export class ObligationsComponent implements OnInit, OnDestroy {
  constructor(
    private obligationService: ObligationApiService,
    private projectService: ProjectApiService,
    private router: Router,
  ) {}

  columns = [{ name: 'Name', prop: 'name', flexGrow: 0.25 }, { name: 'Description', prop: 'desc', flexGrow: 0.75 }];
  @Input()
  project: Project;

  selected = [];

  getPagedResults(query: any): Observable<any> {
    if (this.project && this.project.id) {
      return this.projectService.projectIdUniqueBomObligationsGet(query.perPage, query.page, this.project.id);
    }

    return this.obligationService.obligationGet(
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
    return this.router.navigate(['obligation', selected[0].id]);
  }
}
