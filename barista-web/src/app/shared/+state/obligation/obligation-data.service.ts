import { Obligation, ObligationApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class ObligationDataService extends DefaultDataService<Obligation> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: ObligationApiService) {
    super('Obligation', http, httpUrlGenerator);
  }

  add(entity: Obligation): Observable<Obligation> {
    return this.apiService.obligationPost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService.obligationIdDelete(Number(key)).pipe(switchMap(obligation => of(obligation.id)));
  }

  getAll(): Observable<Obligation[]> {
    return this.apiService.obligationGet();
  }

  getById(id: string | number): Observable<Obligation> {
    return this.apiService.obligationIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<Obligation[]> {
    const query: any = params;
    return this.apiService.obligationGet(
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

  update(update: Update<Obligation>): Observable<Obligation> {
    return this.apiService.obligationIdPatch(Number(update.id), update.changes as Obligation);
  }

  upsert(entity: Obligation): Observable<Obligation> {
    return this.getById(entity.id).pipe(
      take(1),
      switchMap(e => this.update({ id: e.id, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
