import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { BomManualLicense, Project } from '@app/shared/api';

@Component({
  selector: 'app-bom-manual-license-details-dialog',
  template:
    // tslint:disable-next-line:max-line-length
    '<app-bom-manual-license-details [project]="project" [manualLicense]="manualLicense" [newLicense]="newLicense" [dialogData]="data"></app-bom-manual-license-details>',
  styleUrls: ['./bom-manual-license-details.component.scss'],
})
export class BomManualLicenseDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.project = data.project;

    if (data.manualLicense) {
      this.manualLicense = data.manualLicense;
    }

    if (data.newLicense) {
      this.newLicense = data.newLicense;
    }
  }
  manualLicense: BomManualLicense;

  newLicense = true;
  project: Project;
}
