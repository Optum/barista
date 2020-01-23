import { LicenseStatusDeploymentType, LicenseStatusDeploymentTypeApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class LicenseStatusDeploymentTypeDataService extends DefaultDataService<LicenseStatusDeploymentType> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private apiService: LicenseStatusDeploymentTypeApiService,
  ) {
    super('LicenseStatusDeploymentType', http, httpUrlGenerator);
  }

  add(entity: LicenseStatusDeploymentType): Observable<LicenseStatusDeploymentType> {
    return this.apiService.licenseStatusDeploymentTypePost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService
      .licenseStatusDeploymentTypeIdDelete(Number(key))
      .pipe(switchMap(licenseStatusDeploymentType => of(licenseStatusDeploymentType.id)));
  }

  getAll(): Observable<LicenseStatusDeploymentType[]> {
    return this.apiService.licenseStatusDeploymentTypeGet();
  }

  getById(id: string | number): Observable<LicenseStatusDeploymentType> {
    return this.apiService.licenseStatusDeploymentTypeIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<LicenseStatusDeploymentType[]> {
    const query: any = params;
    return this.apiService.licenseStatusDeploymentTypeGet(
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

  update(update: Update<LicenseStatusDeploymentType>): Observable<LicenseStatusDeploymentType> {
    return this.apiService.licenseStatusDeploymentTypeIdPatch(
      Number(update.id),
      update.changes as LicenseStatusDeploymentType,
    );
  }

  upsert(entity: LicenseStatusDeploymentType): Observable<LicenseStatusDeploymentType> {
    return this.getById(entity.id).pipe(
      take(1),
      switchMap(e => this.update({ id: e.id, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
