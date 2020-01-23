import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LicenseApiService } from '@app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss'],
})
export class LicensesComponent implements OnInit, OnDestroy {
  constructor(private licenseApiService: LicenseApiService, private router: Router) {}

  columns = [
    { name: 'Name', prop: 'name', flexGrow: 1 },
    { name: 'Code', prop: 'code', flexGrow: 1 },
    { name: 'Description', prop: 'desc', flexGrow: 1 },
    { name: 'URL', prop: 'homepageUrl', flexGrow: 2 },
  ];
  selected = [];

  getPagedResults(query: any): Observable<any> {
    return this.licenseApiService.licenseGet(
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
    return this.router.navigate(['license', selected[0].id]);
  }
}
