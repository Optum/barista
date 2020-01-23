import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/features/auth/auth.service';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { BomLicenseExceptionOperationMessageService } from '@app/shared/services/BomLicenseExceptionOperationMessageService';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BomGroupedLicenseModulesComponent } from './bom-grouped-license-modules.component';

describe('BomGroupedLicenseModulesComponent', () => {
  let component: BomGroupedLicenseModulesComponent;
  let fixture: ComponentFixture<BomGroupedLicenseModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
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
        RouterTestingModule,
        NgxDatatableModule,
        AppMaterialModule,
        MatDialogModule,
        AppComponentsModule,
        MatSnackBarModule,
      ],
      declarations: [BomGroupedLicenseModulesComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        {
          provide: AuthService,
          useValue: {
            userInfo: jest.fn().mockReturnValueOnce({ role: 'Admin' }),
          },
        },
        BomLicenseExceptionOperationMessageService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BomGroupedLicenseModulesComponent);
    component = fixture.componentInstance;
    component.licenseDto = { id: 1 } as any;
    component.projectId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
