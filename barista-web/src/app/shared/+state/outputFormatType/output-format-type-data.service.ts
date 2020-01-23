import { OutputFormatType, OutputFormatTypeApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class OutputFormatTypeDataService extends DefaultDataService<OutputFormatType> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: OutputFormatTypeApiService) {
    super('OutputFormatType', http, httpUrlGenerator);
  }

  add(entity: OutputFormatType): Observable<OutputFormatType> {
    return this.apiService.outputFormatTypePost(entity);
  }

  delete(key: number | string): Observable<number | string> {
    return this.apiService
      .outputFormatTypeIdDelete(Number(key))
      .pipe(switchMap(outputFormatType => of(outputFormatType.code)));
  }

  getAll(): Observable<OutputFormatType[]> {
    return this.apiService.outputFormatTypeGet();
  }

  getById(id: string | number): Observable<OutputFormatType> {
    return this.apiService.outputFormatTypeIdGet(Number(id));
  }

  getWithQuery(params: string | QueryParams): Observable<OutputFormatType[]> {
    const query: any = params;
    return this.apiService.outputFormatTypeGet(
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

  update(update: Update<OutputFormatType>): Observable<OutputFormatType> {
    return this.apiService.outputFormatTypeIdPatch(Number(update.id), update.changes as OutputFormatType);
  }

  upsert(entity: OutputFormatType): Observable<OutputFormatType> {
    return this.getById(entity.code).pipe(
      take(1),
      switchMap(e => this.update({ id: e.code, changes: entity })),
      catchError(err => this.add(entity)),
    );
  }
}
