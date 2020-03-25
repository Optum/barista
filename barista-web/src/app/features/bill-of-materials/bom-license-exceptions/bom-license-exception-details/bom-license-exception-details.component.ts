import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  BomLicenseException,
  BomLicenseExceptionApiService,
  License,
  LicenseApiService,
  LicenseScanResultItem,
  Project,
  ProjectScanStatusType,
  ProjectScanStatusTypeApiService,
} from '@app/shared/api';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import { ComponentWithMessage } from '@app/shared/app-components/ComponentWithMessage';
import { compareLookupModels } from '@app/shared/helpers/lookup-model';
import { BomLicenseExceptionOperationMessageService } from '@app/shared/services/BomLicenseExceptionOperationMessageService';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-bom-license-exception-details',
  templateUrl: './bom-license-exception-details.component.html',
  styleUrls: ['./bom-license-exception-details.component.scss'],
})
export class BomLicenseExceptionDetailsComponent extends ComponentWithMessage implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BomLicenseExceptionDetailsComponent>,
    private dialog: MatDialog,
    public bomLicenseExceptionApiService: BomLicenseExceptionApiService,
    public licenseApiService: LicenseApiService,
    public projectScanStatusTypeApiService: ProjectScanStatusTypeApiService,
    private messageService: BomLicenseExceptionOperationMessageService,
  ) {
    super();
  }

  compareLookupModels = compareLookupModels;
  license: License;
  @Input() licenseException: BomLicenseException;
  licenses$: Observable<License[]>;
  @Input() licenseScanResultItem: LicenseScanResultItem;
  newException = true;
  notes: string;
  @Input() overrideLicenseScanResult = false;
  @Input() project: Project;
  projectScanStatusType: ProjectScanStatusType;
  projectScanStatusTypes$: Observable<ProjectScanStatusType[]>;

  ngOnInit() {
    this.licenses$ = this.licenseApiService.licenseGet();
    this.newException = !this.licenseException;
    this.projectScanStatusTypes$ = this.projectScanStatusTypeApiService.projectScanStatusTypeGet();

    if (!this.overrideLicenseScanResult) {
      if (this.newException) {
        // Insert
        this.licenseException = {} as BomLicenseException;
      } else {
        // Update
        this.notes = this.licenseException.notes;
        this.license = this.licenseException.license;
        this.projectScanStatusType = this.licenseException.projectScanStatus;
      }

      this.licenseException.project = this.project;
    } else {
      this.newException = false;
      this.license = this.licenseScanResultItem.license;
      this.projectScanStatusType = this.licenseScanResultItem.projectScanStatus;
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this exception?')) {
      this.bomLicenseExceptionApiService
        .bomLicenseExceptionIdDelete(this.licenseException.id)
        .pipe(first())
        .subscribe(
          () => {
            this.showMessage(`Exception for License: ${this.licenseException.license.name} DELETED`);
            this.messageService.send(this.licenseException);
            this.dialogRef.close(true);
          },
          error => {
            this.dialog.open(AppDialogComponent, {
              data: { title: 'Error', message: JSON.stringify(error) },
            });
          },
        );
    }
  }

  async onSubmit() {
    try {
      if (!this.overrideLicenseScanResult) {
        let operation = 'CREATED';
        this.licenseException.license = this.license;
        this.licenseException.notes = this.notes;
        this.licenseException.projectScanStatus = this.projectScanStatusType;
        if (this.newException) {
          // Insert
          const result = await this.bomLicenseExceptionApiService
            .bomLicenseExceptionPost(this.licenseException)
            .toPromise();
          this.licenseException = { ...result };
        } else {
          // Update
          operation = 'UPDATED';
          const result = await this.bomLicenseExceptionApiService
            .bomLicenseExceptionIdPatch(this.licenseException.id, this.licenseException)
            .toPromise();
          this.licenseException = { ...result };
        }

        this.newException = false;
        this.showMessage(`Exception for License:  ${this.licenseException.license.name} ${operation}`);
        this.messageService.send(this.licenseException);
      } else {
        const bomLicenseException = {
          project: this.project,
          license: this.license,
          notes: this.notes,
          licenseItemPath: this.licenseScanResultItem.displayIdentifier,
          projectScanStatus: this.projectScanStatusType,
        } as BomLicenseException;
        await this.bomLicenseExceptionApiService.bomLicenseExceptionPost(bomLicenseException).toPromise();
        this.showMessage(`License has for item ${this.licenseScanResultItem.displayIdentifier} has been overridden.`);
        this.messageService.send(bomLicenseException);
      }

      this.dialogRef.close(true);
    } catch (error) {
      this.dialog.open(AppDialogComponent, {
        data: { title: 'Error', message: JSON.stringify(error) },
      });
    }
  }
}
