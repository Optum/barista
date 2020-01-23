import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/features/auth/auth.service';
import { ProjectNotesDetailsDialogComponent } from '@app/features/projects/project-details/project-notes/project-notes-details/project-notes-details-dialog.component';
import { Project, ProjectNote, ProjectNotesApiService } from '@app/shared/api';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import { BomLicenseExceptionOperationMessageService } from '@app/shared/services/BomLicenseExceptionOperationMessageService';
import { BomSecurityExceptionOperationMessageService } from '@app/shared/services/BomSecurityExceptionOperationMessageService';
import { MessageServiceBasePayload } from '@app/shared/services/MessageServiceBasePayload';
import { ProjectDetailsTabChangedMessageServiceModel } from '@app/shared/services/models/ProjectDetailsTabChangedMessageServiceModel';
import { ProjectDetailsTabChangedMessageService } from '@app/shared/services/ProjectDetailsTabChangedMessageService';
import { ProjectNotesOperationMessageService } from '@app/shared/services/ProjectNotesOperationMessageService';
import * as _ from 'lodash';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-project-notes',
  templateUrl: './project-notes.component.html',
  styleUrls: ['./project-notes.component.scss'],
})
export class ProjectNotesComponent implements OnInit, OnDestroy {
  constructor(
    private projectNotesApiService: ProjectNotesApiService,
    public dialog: MatDialog,
    private messageService: ProjectNotesOperationMessageService,
    private licenseExceptionOperationMessageService: BomLicenseExceptionOperationMessageService,
    private securityExceptionOperationMessageService: BomSecurityExceptionOperationMessageService,
    public authService: AuthService,
    private projectDetailsTabChangedService: ProjectDetailsTabChangedMessageService,
  ) {
    this.messageService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.datatableComponent.refresh();
      });
    this.licenseExceptionOperationMessageService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        // this will come when we are on "BoM" tab, refreshing the table here has no reason.
        this.tableRefreshPending = true;
      });
    this.securityExceptionOperationMessageService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        // this will come when we are on "BoM" tab, refreshing the table here has no reason.
        this.tableRefreshPending = true;
      });
    this.projectDetailsTabChangedService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe((data: MessageServiceBasePayload<ProjectDetailsTabChangedMessageServiceModel>) => {
        if (data.payload.tabTitle === 'Notes' && this.tableRefreshPending) {
          this.datatableComponent.refresh();
          this.tableRefreshPending = false;
        }
      });
  }

  columns = [];
  @ViewChild('datatableComponent', { static: false }) datatableComponent: AppDatatableComponent;
  @ViewChild('dateCellTmpl', { static: true }) dateCellTmpl;
  @Input() project: Project;
  selected = [];
  tableRefreshPending = false;

  addNote() {
    this.openDialog();
  }

  canSelectRow(data: any): boolean {
    const idx = this.datatableComponent.getRowIndex(row => row.id === data.id);
    return idx === 0; // only last entry can be changed
  }

  getPageResults(query: any): any {
    query.filter = `project.id||eq||${this.project.id}`;

    return this.projectNotesApiService.projectNotesGet(
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
      {
        name: 'Created At',
        prop: 'createdAt',
        flexGrow: 2,
        cellTemplate: this.dateCellTmpl,
      },
      {
        name: 'Note',
        prop: 'note',
        flexGrow: 4,
      },
      {
        name: 'Payload',
        prop: 'notePayload',
        flexGrow: 5,
      },
      {
        name: 'Created By',
        prop: 'userId',
        flexGrow: 1,
      },
    ];
  }

  onSelect({ selected }) {
    if (_.isEmpty(selected)) {
      return;
    }
    this.openDialog(selected[0]);
  }

  openDialog(projectNote: ProjectNote = null) {
    this.dialog.open(ProjectNotesDetailsDialogComponent, {
      minWidth: '600px',
      data: {
        project: this.project,
        projectNote,
      },
    });
  }
}
