import { LicenseScanResult, LicenseScanResultApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class LicenseScanResultDataService extends DefaultDataService<LicenseScanResult> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: LicenseScanResultApiService) {
    super('LicenseScanResult', http, httpUrlGenerator);
  }

  add(entity: LicenseScanResult): Observable<LicenseScanResult> {
    return this.apiService.licenseScanResultPost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService.licenseScanResultIdDelete(Number(key)).pipe(switchMap(license => of(license.id)));
  }

  getAll(): Observable<LicenseScanResult[]> {
    return this.apiService.licenseScanResultGet();
  }

  getById(id: string | number): Observable<LicenseScanResult> {
    return this.apiService.licenseScanResultIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<LicenseScanResult[]> {
    const query: any = params;
    return this.apiService.licenseScanResultGet(
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

  update(update: Update<LicenseScanResult>): Observable<LicenseScanResult> {
    return this.apiService.licenseScanResultIdPatch(Number(update.id), update.changes as LicenseScanResult);
  }

  upsert(entity: LicenseScanResult): Observable<LicenseScanResult> {
    return this.getById(entity.id).pipe(
      take(1),
      switchMap(e => this.update({ id: e.id, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
