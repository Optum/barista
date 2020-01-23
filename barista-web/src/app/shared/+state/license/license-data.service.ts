import { License, LicenseApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class LicenseDataService extends DefaultDataService<License> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: LicenseApiService) {
    super('License', http, httpUrlGenerator);
  }

  add(entity: License): Observable<License> {
    return this.apiService.licensePost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService.licenseIdDelete(Number(key)).pipe(switchMap(license => of(license.id)));
  }

  getAll(): Observable<License[]> {
    return this.apiService.licenseGet();
  }

  getById(id: string | number): Observable<License> {
    return this.apiService.licenseIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<License[]> {
    const query: any = params;
    return this.apiService.licenseGet(
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

  update(update: Update<License>): Observable<License> {
    return this.apiService.licenseIdPatch(Number(update.id), update.changes as License);
  }

  upsert(entity: License): Observable<License> {
    return this.getById(entity.id).pipe(
      take(1),
      switchMap(e => this.update({ id: e.id, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
