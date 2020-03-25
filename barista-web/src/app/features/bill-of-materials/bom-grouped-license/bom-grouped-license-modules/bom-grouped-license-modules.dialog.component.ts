import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LicenseDto } from '@app/shared/api';

@Component({
  selector: 'app-bom-grouped-license-modules-dialog',
  template: `
    <app-bom-grouped-license-modules
      [licenseDto]="licenseDto"
      [projectId]="projectId"
    ></app-bom-grouped-license-modules>
  `,
  styleUrls: ['./bom-grouped-license-modules.component.scss'],
})
export class BomGroupedLicenseModulesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    const { licenseDto, projectId } = data;
    this.licenseDto = licenseDto;
    this.projectId = projectId;
  }

  licenseDto: LicenseDto;
  projectId: number;
}
