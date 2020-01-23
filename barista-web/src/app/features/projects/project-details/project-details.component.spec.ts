import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BillOfMaterialsComponent } from '@app/features/bill-of-materials/bill-of-materials.component';
import { BomGroupedLicensesComponent } from '@app/features/bill-of-materials/bom-grouped-license/bom-grouped-licenses.component';
import { BomLicenseExceptionsComponent } from '@app/features/bill-of-materials/bom-license-exceptions/bom-license-exceptions.component';
import { BomLicensesComponent } from '@app/features/bill-of-materials/bom-licenses/bom-licenses.component';
import { BomManualLicensesComponent } from '@app/features/bill-of-materials/bom-manual-licenses/bom-manual-licenses.component';
import { BomSecurityExceptionComponent } from '@app/features/bill-of-materials/bom-security-exception/bom-security-exception.component';
import { BomVulnerabilitiesComponent } from '@app/features/bill-of-materials/bom-vulnerabilities/bom-vulnerabilities.component';
import { ObligationsComponent } from '@app/features/obligations/obligations.component';
import { ProjectNotesComponent } from '@app/features/projects/project-details/project-notes/project-notes.component';
import { ProjectStatsComponent } from '@app/features/projects/project-details/project-stats/project-stats.component';
import { ProjectStatusComponent } from '@app/features/projects/project-details/project-status/project-status.component';
import { LicenseScanResultItemsComponent } from '@app/features/projects/project-scans/project-scan-details/license-scan-result/license-scan-result-items/license-scan-result-items.component';
import { ProjectScansComponent } from '@app/features/projects/project-scans/project-scans.component';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { FlexLayoutTypeComponent } from '@app/shared/app-components/flex-layout-type.component';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { AppServicesModule } from '@app/shared/services/app-services.module';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { of } from 'rxjs';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
              strictActionSerializability: true,
            },
          },
        ),
        AppComponentsModule,
        AppMaterialModule,
        AppServicesModule,
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot(entityConfig),
        EntityStoreModule,
        FlexLayoutModule,
        FormlyMaterialModule,
        FormlyModule.forRoot({
          types: [{ name: 'flex-layout', component: FlexLayoutTypeComponent }],
        }),
        FormsModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        ReactiveFormsModule,
      ],
      declarations: [
        BillOfMaterialsComponent,
        BomGroupedLicensesComponent,
        BomLicenseExceptionsComponent,
        BomLicensesComponent,
        BomManualLicensesComponent,
        BomSecurityExceptionComponent,
        BomVulnerabilitiesComponent,
        FlexLayoutTypeComponent,
        LicenseScanResultItemsComponent,
        ObligationsComponent,
        ProjectDetailsComponent,
        ProjectNotesComponent,
        ProjectScansComponent,
        ProjectStatsComponent,
        ProjectStatusComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of('1'),
            snapshot: {
              paramMap: { get: key => '1' },
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
