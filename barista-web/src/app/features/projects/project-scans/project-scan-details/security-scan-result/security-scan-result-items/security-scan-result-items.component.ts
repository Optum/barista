import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityScanResultItemApiService } from '@app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-security-scan-result-items',
  templateUrl: './security-scan-result-items.component.html',
  styleUrls: ['./security-scan-result-items.component.scss'],
})
export class SecurityScanResultItemsComponent implements OnInit, OnDestroy {
  constructor(
    private securityScanResultItemApiService: SecurityScanResultItemApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  columns = [];
  projectId: number;
  scanId: number;
  selected = [];
  @ViewChild('urlLinkTmpl', { static: true }) urlLinkTmpl;

  getPagedResults(query: any): Observable<any> {
    query.filter = `securityScan.scan||eq||${this.scanId}`;
    return this.securityScanResultItemApiService.securityScanResultItemGet(
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

  ngOnInit() {
    this.columns = [
      { prop: 'path' },
      { prop: 'severity', comparator: this.severityComparitor.bind(this) },
      { prop: 'displayIdentifier' },
      { prop: 'referenceUrl', cellTemplate: this.urlLinkTmpl },
      { prop: 'description' },
    ];

    this.scanId = Number(this.route.snapshot.paramMap.get('scanId'));
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
  }

  onSelect({ selected }) {
    // project/:projectId/scan/:scanId
    const scanResultItem = selected[0].id;

    this.securityScanResultItemApiService.securityScanResultItemIdFullDetailsGet(scanResultItem).subscribe(data => {
      this.router.navigate(
        ['/project', this.projectId, 'scan', this.scanId, 'security-scan-result-item', scanResultItem],
        {
          state: { data },
        },
      );
    });
  }

  onUrlClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  severityComparitor(propA, propB) {
    const propALC = propA.toLowerCase();
    const propBLC = propB.toLowerCase();

    let result = 0;

    switch (propALC) {
      case 'high':
        propBLC !== 'high' ? (result = 1) : propBLC === 'high' ? (result = 0) : (result = 1);
        break;

      case 'medium':
      case 'moderate':
        propBLC === 'high' ? (result = -1) : propBLC === 'low' ? (result = 1) : (result = 0);
        break;

      case 'low':
        propBLC === 'low' ? (result = 0) : (result = -1);
        break;
    }

    // let operator = '===';
    //
    // if (result === -1) {
    //   operator = '<';
    // } else if (result === 1) {
    //   operator = '>';
    // }

    return result;
  }
}
