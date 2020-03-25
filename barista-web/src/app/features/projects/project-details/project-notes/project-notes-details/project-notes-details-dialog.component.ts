import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project, ProjectNote } from '@app/shared/api';

@Component({
  selector: 'app-project-note-details-dialog',
  template: `
    <app-project-notes-details [projectNote]="projectNote" [project]="project"></app-project-notes-details>
  `,
  styleUrls: ['./project-notes-details.component.scss'],
})
export class ProjectNotesDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    const { project, projectNote } = data;
    this.projectNote = projectNote;
    this.project = project;
  }

  project: Project;

  projectNote: ProjectNote;
}
