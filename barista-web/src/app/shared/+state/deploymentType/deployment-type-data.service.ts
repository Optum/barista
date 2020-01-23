import { DeploymentType, DeploymentTypeApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class DeploymentTypeDataService extends DefaultDataService<DeploymentType> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: DeploymentTypeApiService) {
    super('DeploymentType', http, httpUrlGenerator);
  }

  add(entity: DeploymentType): Observable<DeploymentType> {
    return this.apiService.deploymentTypePost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService
      .deploymentTypeIdDelete(Number(key))
      .pipe(switchMap(deploymentType => of(deploymentType.code)));
  }

  getAll(): Observable<DeploymentType[]> {
    return this.apiService.deploymentTypeGet();
  }

  getById(id: string | number): Observable<DeploymentType> {
    return this.apiService.deploymentTypeIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<DeploymentType[]> {
    const query: any = params;
    return this.apiService.deploymentTypeGet(
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

  update(update: Update<DeploymentType>): Observable<DeploymentType> {
    return this.apiService.deploymentTypeIdPatch(Number(update.id), update.changes as DeploymentType);
  }

  upsert(entity: DeploymentType): Observable<DeploymentType> {
    return this.getById(entity.code).pipe(
      take(1),
      switchMap(e => this.update({ id: e.code, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
