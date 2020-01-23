import { ProjectStatusType, ProjectStatusTypeApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class ProjectStatusTypeDataService extends DefaultDataService<ProjectStatusType> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: ProjectStatusTypeApiService) {
    super('ProjectStatusType', http, httpUrlGenerator);
  }

  add(entity: ProjectStatusType): Observable<ProjectStatusType> {
    return this.apiService.projectStatusTypePost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService
      .projectStatusTypeIdDelete(Number(key))
      .pipe(switchMap(projectStatusType => of(projectStatusType.code)));
  }

  getAll(): Observable<ProjectStatusType[]> {
    return this.apiService.projectStatusTypeGet();
  }

  getById(id: string | number): Observable<ProjectStatusType> {
    return this.apiService.projectStatusTypeIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<ProjectStatusType[]> {
    const query: any = params;
    return this.apiService.projectStatusTypeGet(
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

  update(update: Update<ProjectStatusType>): Observable<ProjectStatusType> {
    return this.apiService.projectStatusTypeIdPatch(Number(update.id), update.changes as ProjectStatusType);
  }

  upsert(entity: ProjectStatusType): Observable<ProjectStatusType> {
    return this.getById(entity.code).pipe(
      take(1),
      switchMap(e => this.update({ id: e.code, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
