import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LicenseScanResultItemsComponent } from '@app/features/projects/project-scans/project-scan-details/license-scan-result/license-scan-result-items/license-scan-result-items.component';
import { LicenseScanResultComponent } from '@app/features/projects/project-scans/project-scan-details/license-scan-result/license-scan-result.component';
import { SecurityScanResultItemsComponent } from '@app/features/projects/project-scans/project-scan-details/security-scan-result/security-scan-result-items/security-scan-result-items.component';
import { SecurityScanResultComponent } from '@app/features/projects/project-scans/project-scan-details/security-scan-result/security-scan-result.component';
import { ProjectScansComponent } from '@app/features/projects/project-scans/project-scans.component';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormlyModule } from '@ngx-formly/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TrustHtmlModule } from 'trust-html-pipe';
import { ProjectScanDetailsComponent } from './project-scan-details.component';

describe('ProjectScanDetailsComponent', () => {
  let component: ProjectScanDetailsComponent;
  let fixture: ComponentFixture<ProjectScanDetailsComponent>;

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
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot(entityConfig),
        EntityStoreModule,
        HttpClientTestingModule,
        FormsModule,
        NgxDatatableModule,
        AppMaterialModule,
        AppComponentsModule,
        FormlyModule,
        TrustHtmlModule,
      ],
      declarations: [
        LicenseScanResultComponent,
        LicenseScanResultItemsComponent,
        ProjectScanDetailsComponent,
        ProjectScansComponent,
        SecurityScanResultComponent,
        SecurityScanResultItemsComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
