import { SecurityScanResultItemStatusType, SecurityScanResultItemStatusTypeApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class SecurityScanResultItemStatusTypeDataService extends DefaultDataService<SecurityScanResultItemStatusType> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private apiService: SecurityScanResultItemStatusTypeApiService,
  ) {
    super('SecurityScanResultItemStatusType', http, httpUrlGenerator);
  }

  add(entity: SecurityScanResultItemStatusType): Observable<SecurityScanResultItemStatusType> {
    return this.apiService.securityScanResultItemStatusTypePost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService
      .securityScanResultItemStatusTypeIdDelete(Number(key))
      .pipe(switchMap(securityScanResultItemStatusType => of(securityScanResultItemStatusType.code)));
  }

  getAll(): Observable<SecurityScanResultItemStatusType[]> {
    return this.apiService.securityScanResultItemStatusTypeGet();
  }

  getById(id: string | number): Observable<SecurityScanResultItemStatusType> {
    return this.apiService.securityScanResultItemStatusTypeIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<SecurityScanResultItemStatusType[]> {
    const query: any = params;
    return this.apiService.securityScanResultItemStatusTypeGet(
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

  update(update: Update<SecurityScanResultItemStatusType>): Observable<SecurityScanResultItemStatusType> {
    return this.apiService.securityScanResultItemStatusTypeIdPatch(
      Number(update.id),
      update.changes as SecurityScanResultItemStatusType,
    );
  }

  upsert(entity: SecurityScanResultItemStatusType): Observable<SecurityScanResultItemStatusType> {
    return this.getById(entity.code).pipe(
      take(1),
      switchMap(e => this.update({ id: e.code, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
