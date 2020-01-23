import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Project, ProjectNote, ProjectNotesApiService } from '@app/shared/api';
import { ComponentWithMessage } from '@app/shared/app-components/ComponentWithMessage';
import { ProjectNotesOperationMessageService } from '@app/shared/services/ProjectNotesOperationMessageService';

@Component({
  selector: 'app-project-notes-details',
  templateUrl: './project-notes-details.component.html',
  styleUrls: ['./project-notes-details.component.scss'],
})
export class ProjectNotesDetailsComponent extends ComponentWithMessage implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ProjectNotesDetailsComponent>,
    private projectNotesApiService: ProjectNotesApiService,
    private messageService: ProjectNotesOperationMessageService,
  ) {
    super();
  }

  isBusy: boolean;

  notes: string;

  @Input() project: Project;

  @Input() projectNote: ProjectNote;

  ngOnInit() {
    if (this.projectNote) {
      this.notes = this.projectNote.note;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  async onSubmit() {
    this.isBusy = true;
    let action = '';
    try {
      if (!this.projectNote) {
        this.projectNote = {
          project: this.project,
          note: this.notes,
        } as ProjectNote;
        await this.projectNotesApiService.projectNotesPost(this.projectNote).toPromise();
        action = 'created';
      } else {
        this.projectNote.note = this.notes;
        await this.projectNotesApiService.projectNotesIdPatch(this.projectNote.id, this.projectNote).toPromise();
        action = 'updated';
      }
      this.showMessage(`Note successfully ${action}.`);
      this.messageService.send(this.projectNote);
      this.dialogRef.close();
    } catch (e) {
      this.showMessage('Could not save the note. Error: ' + e);
    }
    this.isBusy = false;
  }
}
