import { Project, ProjectApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class ProjectDataService extends DefaultDataService<Project> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: ProjectApiService) {
    super('Project', http, httpUrlGenerator);
  }

  add(entity: Project): Observable<Project> {
    return this.apiService.projectPost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService.projectIdDelete(Number(key)).pipe(switchMap(project => of(project.id)));
  }

  getAll(): Observable<Project[]> {
    return this.apiService.projectGet();
  }

  getById(id: string | number): Observable<Project> {
    return this.apiService.projectIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<Project[]> {
    const query: any = params;
    return this.apiService.projectGet(
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

  update(update: Update<Project>): Observable<Project> {
    return this.apiService.projectIdPatch(Number(update.id), update.changes as Project);
  }

  upsert(entity: Project): Observable<Project> {
    return this.getById(entity.id).pipe(
      take(1),
      switchMap(e => this.update({ id: e.id, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
