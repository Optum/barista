import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenseScanResultItemApiService } from '@app/shared/api';

@Component({
  selector: 'app-license-scan-result-items',
  templateUrl: './license-scan-result-items.component.html',
  styleUrls: ['./license-scan-result-items.component.scss'],
})
export class LicenseScanResultItemsComponent implements OnInit, OnDestroy {
  projectId: number;

  scanId: number;
  selected = [];

  constructor(
    private licenseScanResultItemApiService: LicenseScanResultItemApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.scanId = Number(this.route.snapshot.paramMap.get('scanId'));
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
  }

  onSelect(event: any) {
    this.selected = event.selected;
    // TODO: Move the license-scan-result-item route to stand on it's own so that scan/project id's are not needed
    // Then this method can be moved to the generic license-scan-result-item-datatable component
    const licenseResultItem = this.selected[0].id;

    this.licenseScanResultItemApiService.licenseScanResultItemIdFullDetailsGet(licenseResultItem).subscribe(data => {
      this.router.navigate(
        ['/project', this.projectId, 'scan', this.scanId, 'license-scan-result-item', licenseResultItem],
        {
          state: { data },
        },
      );
    });
  }
}
