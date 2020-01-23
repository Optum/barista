import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageManagerApiService } from '@app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-package-managers',
  templateUrl: './package-managers.component.html',
  styleUrls: ['./package-managers.component.scss'],
})
export class PackageManagersComponent implements OnInit, OnDestroy {
  constructor(private packageManagerApiService: PackageManagerApiService, private router: Router) {}

  columns = [{ name: 'Code', prop: 'code', flexGrow: 1 }, { name: 'Description', prop: 'description', flexGrow: 1 }];
  selected = [];

  getPagedResults(query: any): Observable<any> {
    return this.packageManagerApiService.packageManagerGet(
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
    return this.router.navigate(['package-manager', selected[0].code]);
  }
}
