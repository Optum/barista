import { Component, Input, OnInit } from '@angular/core';
import {
  ProjectDistinctLicenseDto,
  ProjectDistinctSeverityDto,
  ProjectDistinctVulnerabilityDto,
} from '@app/shared/api';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-project-stats',
  templateUrl: './project-stats.component.html',
  styleUrls: ['./project-stats.component.scss'],
})
export class ProjectStatsComponent implements OnInit {
  constructor() {}
  licenseData;
  @Input() licenseData$: Observable<ProjectDistinctLicenseDto>;

  licenseLabels;
  severityData;
  @Input() severityData$: Observable<ProjectDistinctSeverityDto>;
  severityLabels;

  vulnerabilityData;
  @Input() vulnerabilityData$: Observable<ProjectDistinctVulnerabilityDto>;

  vulnerabilityLabels;

  ngOnInit() {
    if (this.licenseData$) {
      this.licenseData$
        .pipe(
          first(),
          map(items => {
            const counts = _.map(items, (item: any) => item.count);
            const labels = _.map(items, (item: any) => item.license.name);
            return { counts, labels };
          }),
        )
        .subscribe(result => {
          this.licenseLabels = result.labels;
          this.licenseData = result.counts;
        });
    }

    if (this.vulnerabilityData$) {
      this.vulnerabilityData$
        .pipe(
          first(),
          map(items => {
            const counts = _.map(items, (item: any) => item.count);
            const labels = _.map(items, (item: any) => item.path);
            return { counts, labels };
          }),
        )
        .subscribe(result => {
          this.vulnerabilityLabels = result.labels;
          this.vulnerabilityData = result.counts;
        });
    }

    if (this.severityData$) {
      this.severityData$
        .pipe(
          first(),
          map(items => {
            const counts = _.map(items, (item: any) => item.count);
            const labels = _.map(items, (item: any) => item.severity);
            return { counts, labels };
          }),
        )
        .subscribe(result => {
          this.severityLabels = result.labels;
          this.severityData = result.counts;
        });
    }
  }
}
