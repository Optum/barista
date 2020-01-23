import { Scan, ScanApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class ScanDataService extends DefaultDataService<Scan> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: ScanApiService) {
    super('Scan', http, httpUrlGenerator);
  }

  add(entity: Scan): Observable<Scan> {
    return this.apiService.scanPost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService.scanIdDelete(Number(key)).pipe(switchMap(scan => of(scan.id)));
  }

  getAll(): Observable<Scan[]> {
    return this.apiService.scanGet();
  }

  getById(id: string | number): Observable<Scan> {
    return this.apiService.scanIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<Scan[]> {
    const query: any = params;
    return this.apiService.scanGet(
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

  update(update: Update<Scan>): Observable<Scan> {
    return this.apiService.scanIdPatch(Number(update.id), update.changes as Scan);
  }

  upsert(entity: Scan): Observable<Scan> {
    return this.getById(entity.id).pipe(
      take(1),
      switchMap(e => this.update({ id: e.id, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
