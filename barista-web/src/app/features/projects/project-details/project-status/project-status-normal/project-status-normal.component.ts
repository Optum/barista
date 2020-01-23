import { Component, OnInit } from '@angular/core';
import { ProjectStatusComponent } from '@app/features/projects/project-details/project-status/project-status.component';
import { ProjectApiService } from '@app/shared/api';

@Component({
  selector: 'app-project-status-normal',
  templateUrl: './project-status-normal.component.html',
  styleUrls: ['./project-status-normal.component.scss'],
})
export class ProjectStatusNormalComponent extends ProjectStatusComponent implements OnInit {
  constructor(public projectApiService: ProjectApiService) {
    super(projectApiService);
  }

  ngOnInit() {}
}
