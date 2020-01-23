import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Project, ProjectApiService, ProjectScanStateDto } from '@app/shared/api';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss'],
})
export class ProjectStatusComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(public projectApiService: ProjectApiService) {}
  licenseStatusCode = 'unknown';
  @Input() project: Project;
  projectStatus$: Observable<ProjectScanStateDto>;
  securityStatusCode = 'unknown';

  ngAfterViewInit(): void {
    this.projectStatus$ = this.projectApiService.projectIdStatsProjectScanStatusGet(`${this.project.id}`);
    this.projectStatus$.pipe(untilDestroyed(this)).subscribe(status => {
      this.licenseStatusCode = status.licenseStatus.code;
      this.securityStatusCode = status.securityStatus.code;
    });
  }

  ngOnDestroy(): void {}

  ngOnInit() {}
}
