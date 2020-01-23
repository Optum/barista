import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectStatusTypeDetailsComponent } from '@app/features/project-status-types/project-status-type-details/project-status-type-details.component';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { FlexLayoutTypeComponent } from '@app/shared/app-components/flex-layout-type.component';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('ProjectStatusTypeDetailsComponent', () => {
  let component: ProjectStatusTypeDetailsComponent;
  let fixture: ComponentFixture<ProjectStatusTypeDetailsComponent>;

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
        FormlyModule.forRoot({
          types: [{ name: 'flex-layout', component: FlexLayoutTypeComponent }],
        }),
      ],
      declarations: [ProjectStatusTypeDetailsComponent, FlexLayoutTypeComponent],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatusTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
