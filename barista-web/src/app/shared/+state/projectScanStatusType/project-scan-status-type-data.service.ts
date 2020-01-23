import { ProjectScanStatusType, ProjectScanStatusTypeApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class ProjectScanStatusTypeDataService extends DefaultDataService<ProjectScanStatusType> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private apiService: ProjectScanStatusTypeApiService,
  ) {
    super('ProjectScanStatusType', http, httpUrlGenerator);
  }

  add(entity: ProjectScanStatusType): Observable<ProjectScanStatusType> {
    return this.apiService.projectScanStatusTypePost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService
      .projectScanStatusTypeIdDelete(Number(key))
      .pipe(switchMap(projectScanStatusType => of(projectScanStatusType.code)));
  }

  getAll(): Observable<ProjectScanStatusType[]> {
    return this.apiService.projectScanStatusTypeGet();
  }

  getById(id: string | number): Observable<ProjectScanStatusType> {
    return this.apiService.projectScanStatusTypeIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<ProjectScanStatusType[]> {
    const query: any = params;
    return this.apiService.projectScanStatusTypeGet(
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

  update(update: Update<ProjectScanStatusType>): Observable<ProjectScanStatusType> {
    return this.apiService.projectScanStatusTypeIdPatch(Number(update.id), update.changes as ProjectScanStatusType);
  }

  upsert(entity: ProjectScanStatusType): Observable<ProjectScanStatusType> {
    return this.getById(entity.code).pipe(
      take(1),
      switchMap(e => this.update({ id: e.code, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
