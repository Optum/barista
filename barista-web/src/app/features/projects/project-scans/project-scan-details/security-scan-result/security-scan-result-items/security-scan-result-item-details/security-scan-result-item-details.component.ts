import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '@app/shared/+state/project/project.service';
import IBreadcrumb from '@app/shared/app-components/breadcrumbs/IBreadcrumb';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-security-scan-result-item-details',
  templateUrl: './security-scan-result-item-details.component.html',
  styleUrls: ['./security-scan-result-item-details.component.scss'],
})
export class SecurityScanResultItemDetailsComponent implements OnInit, OnDestroy {
  breadcrumbs: IBreadcrumb[] = [];
  state$: Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    if (window.history.state && window.history.state.data) {
      this.state$ = this.route.paramMap.pipe(map(() => window.history.state.data));
    }

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
              params: { tab: 1 },
            },
            { url: ``, title: `Item ${itemId}` },
          ];
        }
      });
  }
}
