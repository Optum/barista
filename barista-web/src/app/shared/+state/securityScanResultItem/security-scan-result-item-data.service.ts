import { SecurityScanResultItem, SecurityScanResultItemApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class SecurityScanResultItemDataService extends DefaultDataService<SecurityScanResultItem> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private apiService: SecurityScanResultItemApiService,
  ) {
    super('SecurityScanResultItem', http, httpUrlGenerator);
  }

  add(entity: SecurityScanResultItem): Observable<SecurityScanResultItem> {
    return this.apiService.securityScanResultItemPost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService.securityScanResultItemIdDelete(Number(key)).pipe(switchMap(license => of(license.id)));
  }

  getAll(): Observable<SecurityScanResultItem[]> {
    return this.apiService.securityScanResultItemGet();
  }

  getById(id: string | number): Observable<SecurityScanResultItem> {
    return this.apiService.securityScanResultItemIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<SecurityScanResultItem[]> {
    const query: any = params;
    return this.apiService.securityScanResultItemGet(
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

  update(update: Update<SecurityScanResultItem>): Observable<SecurityScanResultItem> {
    return this.apiService.securityScanResultItemIdPatch(Number(update.id), update.changes as SecurityScanResultItem);
  }

  upsert(entity: SecurityScanResultItem): Observable<SecurityScanResultItem> {
    return this.getById(entity.id).pipe(
      take(1),
      switchMap(e => this.update({ id: e.id, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
