import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '@app/shared/+state/project/project.service';
import IBreadcrumb from '@app/shared/app-components/breadcrumbs/IBreadcrumb';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-license-scan-result-item-details',
  templateUrl: './license-scan-result-item-details.component.html',
  styleUrls: ['./license-scan-result-item-details.component.scss'],
})
export class LicenseScanResultItemDetailsComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) {}
  breadcrumbs: IBreadcrumb[] = [];
  state$: Observable<any>;

  ngOnDestroy(): void {}

  ngOnInit() {
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state.data));

    const scanId = this.route.snapshot.paramMap.get('scanId');
    const projectId = this.route.snapshot.paramMap.get('projectId');
    const itemId = this.route.snapshot.paramMap.get('itemId');

    this.projectService.setFilter(projectId); // ngrx entity data service and entity service
    this.projectService.filteredEntities$ // subscribe to observables, look at entity-metadata.ts
      .pipe(untilDestroyed(this))
      .subscribe(projects => {
        if (projects.length > 0) {
          const projectDetail = { ...projects[0] };

          this.breadcrumbs = [
            { url: '/project', title: 'Projects' },
            { url: `/project/${projectId}`, title: `${projectDetail.name}` },
            {
              url: `/project/${projectId}`,
              title: `Scans`,
              params: { tab: 2 },
            },
            {
              url: `/project/${projectId}/scan/${scanId}`,
              title: `Scan ${scanId}`,
              params: { tab: 0 },
            },
            { url: ``, title: `Item ${itemId}` },
          ];
        }
      });
  }
}
