import { SecurityScanResult, SecurityScanResultApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class SecurityScanResultDataService extends DefaultDataService<SecurityScanResult> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: SecurityScanResultApiService) {
    super('SecurityScanResult', http, httpUrlGenerator);
  }

  add(entity: SecurityScanResult): Observable<SecurityScanResult> {
    return this.apiService.securityScanResultPost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService.securityScanResultIdDelete(Number(key)).pipe(switchMap(license => of(license.id)));
  }

  getAll(): Observable<SecurityScanResult[]> {
    return this.apiService.securityScanResultGet();
  }

  getById(id: string | number): Observable<SecurityScanResult> {
    return this.apiService.securityScanResultIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<SecurityScanResult[]> {
    const query: any = params;
    return this.apiService.securityScanResultGet(
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

  update(update: Update<SecurityScanResult>): Observable<SecurityScanResult> {
    return this.apiService.securityScanResultIdPatch(Number(update.id), update.changes as SecurityScanResult);
  }

  upsert(entity: SecurityScanResult): Observable<SecurityScanResult> {
    return this.getById(entity.id).pipe(
      take(1),
      switchMap(e => this.update({ id: e.id, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
