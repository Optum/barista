import { ProjectDevelopmentType, ProjectDevelopmentTypeApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class ProjectDevelopmentTypeDataService extends DefaultDataService<ProjectDevelopmentType> {
  // tslint:disable-next-line:max-line-length
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private apiService: ProjectDevelopmentTypeApiService,
  ) {
    super('ProjectDevelopmentType', http, httpUrlGenerator);
  }

  add(entity: ProjectDevelopmentType): Observable<ProjectDevelopmentType> {
    return this.apiService.projectDevelopmentTypePost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService
      .projectDevelopmentTypeIdDelete(Number(key))
      .pipe(switchMap(projectDevelopmentType => of(projectDevelopmentType.code)));
  }

  getAll(): Observable<ProjectDevelopmentType[]> {
    return this.apiService.projectDevelopmentTypeGet();
  }

  getById(id: string | number): Observable<ProjectDevelopmentType> {
    return this.apiService.projectDevelopmentTypeIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<ProjectDevelopmentType[]> {
    const query: any = params;
    return this.apiService.projectDevelopmentTypeGet(
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

  update(update: Update<ProjectDevelopmentType>): Observable<ProjectDevelopmentType> {
    return this.apiService.projectDevelopmentTypeIdPatch(Number(update.id), update.changes as ProjectDevelopmentType);
  }

  upsert(entity: ProjectDevelopmentType): Observable<ProjectDevelopmentType> {
    return this.getById(entity.code).pipe(
      take(1),
      switchMap(e => this.update({ id: e.code, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
