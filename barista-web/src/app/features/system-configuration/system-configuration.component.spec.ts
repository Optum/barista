import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
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

import { SystemConfigurationComponent } from './system-configuration.component';

describe('SystemConfigurationComponent', () => {
  let component: SystemConfigurationComponent;
  let fixture: ComponentFixture<SystemConfigurationComponent>;

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
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        FormlyMaterialModule,
        AppMaterialModule,
        AppComponentsModule,
        FlexLayoutModule,
        AppServicesModule,
        FormlyModule.forRoot({
          types: [{ name: 'flex-layout', component: FlexLayoutTypeComponent }],
        }),
      ],
      declarations: [SystemConfigurationComponent, FlexLayoutTypeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
