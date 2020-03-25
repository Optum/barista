// tslint:disable:max-line-length
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BomManualLicenseDetailsDialogComponent } from '@app/features/bill-of-materials/bom-manual-licenses/bom-manual-license-details/bom-manual-license-details-dialog.component';
import { BomManualLicense, BomManualLicenseApiService, License, LicenseApiService, Project } from '@app/shared/api';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import { ComponentWithMessage } from '@app/shared/app-components/ComponentWithMessage';
import { compareLookupModels } from '@app/shared/helpers/lookup-model';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

// tslint:enable:max-line-length

@Component({
  selector: 'app-bom-manual-license-details',
  templateUrl: './bom-manual-license-details.component.html',
  styleUrls: ['./bom-manual-license-details.component.scss'],
})
export class BomManualLicenseDetailsComponent extends ComponentWithMessage implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BomManualLicenseDetailsDialogComponent>,
    private dialog: MatDialog,
    public bomManualLicenseApiService: BomManualLicenseApiService,
    public licenseApiService: LicenseApiService,
  ) {
    super();
  }
  compareLookupModels = compareLookupModels;
  @Input()
  dialogData: any;
  licenses$: Observable<License[]>;
  @Input()
  manualLicense: BomManualLicense;
  @Input()
  newLicense = true;
  @Input()
  project: Project;

  readonlyProductName = false;
  readonlyProductVersion = false;

  ngOnInit() {
    this.licenses$ = this.licenseApiService.licenseGet(null, 'isCpdx||eq||true');

    if (!this.manualLicense) {
      // Insert
      this.manualLicense = {} as BomManualLicense;
    } else {
      // Update
    }

    this.manualLicense.project = this.project;

    if (this.dialogData) {
      this.readonlyProductName = this.dialogData.prePopulatedProductName;
      this.readonlyProductVersion = this.dialogData.prePopulatedProductVersion;
      this.manualLicense.isDefault = this.dialogData.isDefaultLicense;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this manual license?')) {
      this.bomManualLicenseApiService
        .bomManualLicenseIdDelete(this.manualLicense.id)
        .pipe(first())
        .subscribe(
          result => {
            this.showMessage(`Manual License: ${this.manualLicense.productName} DELETED`);

            this.dialogRef.close();
          },
          error => {
            this.dialog.open(AppDialogComponent, {
              data: { title: 'Error', message: JSON.stringify(error) },
            });
          },
        );
    }
  }

  onSubmit() {
    if (this.newLicense) {
      // Insert

      this.bomManualLicenseApiService
        .bomManualLicensePost(this.manualLicense)
        .pipe(first())
        .subscribe(
          result => {
            this.manualLicense = { ...result };
            this.newLicense = false;

            this.showMessage(`Manual License:  ${this.manualLicense.productName} CREATED`);

            this.dialogRef.close();
          },
          error => {
            this.dialog.open(AppDialogComponent, {
              data: { title: 'Error', message: JSON.stringify(error) },
            });
          },
        );
    } else {
      // Update
      this.bomManualLicenseApiService
        .bomManualLicenseIdPatch(this.manualLicense.id, this.manualLicense)
        .pipe(first())
        .subscribe(
          result => {
            this.manualLicense = { ...result };
            this.newLicense = false;

            this.showMessage(`Manual License:  ${this.manualLicense.productName} UPDATED`);
          },
          error => {
            this.dialog.open(AppDialogComponent, {
              data: { title: 'Error', message: JSON.stringify(error) },
            });
          },
        );
    }
  }
}
