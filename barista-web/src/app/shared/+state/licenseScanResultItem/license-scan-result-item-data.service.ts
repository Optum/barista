import { LicenseScanResultItem, LicenseScanResultItemApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class LicenseScanResultItemDataService extends DefaultDataService<LicenseScanResultItem> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private apiService: LicenseScanResultItemApiService,
  ) {
    super('LicenseScanResultItem', http, httpUrlGenerator);
  }

  add(entity: LicenseScanResultItem): Observable<LicenseScanResultItem> {
    return this.apiService.licenseScanResultItemPost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService.licenseScanResultItemIdDelete(Number(key)).pipe(switchMap(license => of(license.id)));
  }

  getAll(): Observable<LicenseScanResultItem[]> {
    return this.apiService.licenseScanResultItemGet();
  }

  getById(id: string | number): Observable<LicenseScanResultItem> {
    return this.apiService.licenseScanResultItemIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<LicenseScanResultItem[]> {
    const query: any = params;
    return this.apiService.licenseScanResultItemGet(
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

  update(update: Update<LicenseScanResultItem>): Observable<LicenseScanResultItem> {
    return this.apiService.licenseScanResultItemIdPatch(Number(update.id), update.changes as LicenseScanResultItem);
  }

  upsert(entity: LicenseScanResultItem): Observable<LicenseScanResultItem> {
    return this.getById(entity.id).pipe(
      take(1),
      switchMap(e => this.update({ id: e.id, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
