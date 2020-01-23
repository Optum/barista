import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutputFormatTypeApiService } from '@app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-output-format',
  templateUrl: './output-format.component.html',
  styleUrls: ['./output-format.component.scss'],
})
export class OutputFormatComponent implements OnInit, OnDestroy {
  constructor(private outputFormatTypeApiService: OutputFormatTypeApiService, private router: Router) {}

  columns = [{ name: 'Name', prop: 'code', flexGrow: 1 }, { name: 'Description', prop: 'description', flexGrow: 1 }];
  selected = [];

  getPagedResults(query: any): Observable<any> {
    return this.outputFormatTypeApiService.outputFormatTypeGet(
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

  ngOnDestroy(): void {}

  ngOnInit() {}

  onSelect({ selected }) {
    return this.router.navigate(['output-format-type', selected[0].code]);
  }
}
