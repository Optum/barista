import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityScanResultService } from '@app/shared/+state/securityScanResult/security-scan-result.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-security-scan-result',
  templateUrl: './security-scan-result.component.html',
  styleUrls: ['./security-scan-result.component.scss'],
})
export class SecurityScanResultComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private securityScanResultService: SecurityScanResultService,
  ) {}

  securityScanHtmlResult$: Observable<string>;

  ngOnDestroy(): void {}

  ngOnInit() {
    const scanId = this.route.snapshot.paramMap.get('scanId');
    const projectId = this.route.snapshot.paramMap.get('projectId');

    console.log('projectId', projectId, 'scanId', scanId);

    this.securityScanResultService.setFilter(scanId);
    this.securityScanResultService.getWithQuery({
      filter: `scan||eq||${scanId}`,
    });

    this.securityScanHtmlResult$ = this.securityScanResultService.filteredEntities$.pipe(
      untilDestroyed(this),
      filter(result => result.length > 0),
      switchMap(result => {
        return of(result[0].htmlResults);
      }),
    );
  }
}
