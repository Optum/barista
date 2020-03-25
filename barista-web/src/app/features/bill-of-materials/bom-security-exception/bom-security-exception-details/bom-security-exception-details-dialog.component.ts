import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BomSecurityException, Project, SecurityScanResultItem } from '@app/shared/api';

@Component({
  selector: 'app-bom-security-exceptions-details-dialog',
  template: `
    <app-bom-security-exception-details
      [bomSecurityException]="bomSecurityException"
      [project]="project"
      [bomSecurityItem]="bomSecurityItem"
    ></app-bom-security-exception-details>
  `,
  styleUrls: ['./bom-security-exception-details.component.scss'],
})
export class BomSecurityExceptionDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    const { bomSecurityException, project, bomSecurityItem } = data;
    this.bomSecurityException = bomSecurityException;
    this.project = project;
    this.bomSecurityItem = bomSecurityItem;
  }
  bomSecurityException: BomSecurityException;

  bomSecurityItem: SecurityScanResultItem;

  project: Project;
}
