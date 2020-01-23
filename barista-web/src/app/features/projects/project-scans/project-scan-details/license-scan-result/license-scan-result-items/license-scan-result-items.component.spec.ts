import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { ObjectDetailsComponent } from '@app/shared/app-components/object-details/object-details.component';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormlyModule } from '@ngx-formly/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { SafePipeModule } from 'safe-pipe';
import { LicenseScanResultItemsComponent } from './license-scan-result-items.component';

describe('LicenseScanResultItemsComponent', () => {
  let component: LicenseScanResultItemsComponent;
  let fixture: ComponentFixture<LicenseScanResultItemsComponent>;

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
        SafePipeModule,
        PrettyJsonModule,
      ],
      declarations: [LicenseScanResultItemsComponent, ObjectDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseScanResultItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
