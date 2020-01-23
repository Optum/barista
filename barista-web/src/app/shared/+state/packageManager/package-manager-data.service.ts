import { PackageManager, PackageManagerApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class PackageManagerDataService extends DefaultDataService<PackageManager> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: PackageManagerApiService) {
    super('PackageManager', http, httpUrlGenerator);
  }

  add(entity: PackageManager): Observable<PackageManager> {
    return this.apiService.packageManagerPost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService
      .packageManagerIdDelete(Number(key))
      .pipe(switchMap(packageManager => of(packageManager.code)));
  }

  getAll(): Observable<PackageManager[]> {
    return this.apiService.packageManagerGet();
  }

  getById(id: string | number): Observable<PackageManager> {
    return this.apiService.packageManagerIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<PackageManager[]> {
    const query: any = params;
    return this.apiService.packageManagerGet(
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

  update(update: Update<PackageManager>): Observable<PackageManager> {
    return this.apiService.packageManagerIdPatch(Number(update.id), update.changes as PackageManager);
  }

  upsert(entity: PackageManager): Observable<PackageManager> {
    return this.getById(entity.code).pipe(
      take(1),
      switchMap(e => this.update({ id: e.code, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
