import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  BomSecurityException,
  BomSecurityExceptionApiService,
  Project,
  ProjectScanStatusType,
  ProjectScanStatusTypeApiService,
  SecurityScanResultItem,
} from '@app/shared/api';
import { ComponentWithMessage } from '@app/shared/app-components/ComponentWithMessage';
import { AppDatatableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import { compareLookupModels } from '@app/shared/helpers/lookup-model';
import { BomSecurityExceptionOperationMessageService } from '@app/shared/services/BomSecurityExceptionOperationMessageService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bom-security-exception-details',
  templateUrl: './bom-security-exception-details.component.html',
  styleUrls: ['./bom-security-exception-details.component.scss'],
})
export class BomSecurityExceptionDetailsComponent extends ComponentWithMessage implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<BomSecurityExceptionDetailsComponent>,
    private bomSecurityExceptionApiService: BomSecurityExceptionApiService,
    public projectScanStatusTypeApiService: ProjectScanStatusTypeApiService,
    private messageService: BomSecurityExceptionOperationMessageService,
  ) {
    super();
  }

  @Input() bomSecurityException: BomSecurityException;
  @Input() bomSecurityItem: SecurityScanResultItem;
  compareLookupModels = compareLookupModels;
  cveId: string;
  isBusy: boolean;
  isNewRecord: boolean;
  notes: string;
  packageName: string;
  @Input() project: Project;
  projectScanStatusType: ProjectScanStatusType;
  projectScanStatusTypes$: Observable<ProjectScanStatusType[]>;
  @ViewChild('projectsSearchInput') projectsSearchInput: ElementRef;
  @ViewChild('searchProjectsDataTable') searchProjectsDataTable: AppDatatableComponent;

  ngOnDestroy(): void {}

  ngOnInit() {
    this.projectScanStatusTypes$ = this.projectScanStatusTypeApiService.projectScanStatusTypeGet();

    this.isNewRecord = !this.bomSecurityException;
    if (this.bomSecurityException) {
      // updating an existing one
      this.projectScanStatusType = this.bomSecurityException.projectScanStatus;
      this.cveId = this.bomSecurityException.cveId;
      this.notes = this.bomSecurityException.notes;
      this.packageName = this.bomSecurityException.securityItemPath;
    } else {
      // creating a new entry, opened from SecurityItems component
      this.projectScanStatusType = this.bomSecurityItem.projectScanStatus;
      this.cveId = this.bomSecurityItem.cveId;
      this.notes = '';
      this.packageName = this.bomSecurityItem.path;
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  async onDelete() {
    if (confirm('Are you sure?')) {
      await this.bomSecurityExceptionApiService.bomSecurityExceptionIdDelete(this.bomSecurityException.id).toPromise();
      this.showMessage('Security exception successfully deleted.');
      this.dialogRef.close(true);
      this.messageService.send(null);
    }
  }

  async onSubmit() {
    this.isBusy = true;
    let action: string;
    try {
      if (!this.isNewRecord) {
        this.bomSecurityException.notes = this.notes;
        this.bomSecurityException.projectScanStatus = this.projectScanStatusType;
        this.bomSecurityException.cveId = this.cveId;

        await this.bomSecurityExceptionApiService
          .bomSecurityExceptionIdPatch(this.bomSecurityException.id, this.bomSecurityException)
          .toPromise();
        action = 'updated';
      } else {
        // create a new exception
        this.bomSecurityException = {
          notes: this.notes,
          projectScanStatus: this.projectScanStatusType,
          cveId: this.cveId,
          project: this.project,
          securityItemPath: this.bomSecurityItem.path,
        } as BomSecurityException;
        await this.bomSecurityExceptionApiService.bomSecurityExceptionPost(this.bomSecurityException).toPromise();
        action = 'created';
      }

      this.dialogRef.close(true);
      this.showMessage(`Security exception successfully ${action}.`);
      this.messageService.send(this.bomSecurityException);
    } catch (e) {
      // this will happen when we insert a duplicate record [projectId, package, CVE]
      this.showMessage(
        'Could not create a security exception. ' +
          'Most likely the combination [project, package, CVE] already exists.',
      );
    }
    this.isBusy = false;
  }
}
