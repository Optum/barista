import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolTipApiService } from '@app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  styleUrls: ['./tooltips.component.scss'],
})
export class TooltipsComponent implements OnInit {
  constructor(private toolTipService: ToolTipApiService, private router: Router) {}

  columns = [
    {
      name: 'Page',
      prop: 'pageName',
      flexGrow: 1,
    },
    {
      name: 'Element name',
      prop: 'elementName',
      flexGrow: 1,
    },
    {
      name: 'Enabled',
      prop: 'enabled',
      flexGrow: 1,
    },
    {
      name: 'Content',
      prop: 'content',
      flexGrow: 4,
    },
  ];

  selected = [];

  getPagedResults(query: any): Observable<any> {
    return this.toolTipService.tooltipGet(
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

  ngOnInit() {}

  onSelect({ selected }) {
    return this.router.navigate(['tooltip', selected[0].id]);
  }
}
