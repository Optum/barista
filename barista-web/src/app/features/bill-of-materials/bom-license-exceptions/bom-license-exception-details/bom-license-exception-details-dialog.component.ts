import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BomLicenseException, LicenseScanResultItem, Project } from '@app/shared/api';

@Component({
  selector: 'app-bom-license-exception-details-dialog',
  template:
    '<app-bom-license-exception-details [project]="project" [licenseScanResultItem]="licenseScanResultItem" ' +
    '[licenseException]="licenseException" [overrideLicenseScanResult]="!!licenseScanResultItem"> ' +
    '</app-bom-license-exception-details>',
  styleUrls: ['./bom-license-exception-details.component.scss'],
})
export class BomLicenseExceptionDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.project = data.project;
    this.licenseException = data.licenseException;
    this.licenseScanResultItem = data.licenseScanResultItem;
  }

  licenseException: BomLicenseException;
  licenseScanResultItem: LicenseScanResultItem;
  project: Project;
}
