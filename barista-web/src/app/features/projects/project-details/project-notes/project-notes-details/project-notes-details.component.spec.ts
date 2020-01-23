import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { Project } from '@app/shared/api';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { ProjectNotesOperationMessageService } from '@app/shared/services/ProjectNotesOperationMessageService';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProjectNotesDetailsComponent } from './project-notes-details.component';

describe('ProjectNotesDetailsComponent', () => {
  let component: ProjectNotesDetailsComponent;
  let fixture: ComponentFixture<ProjectNotesDetailsComponent>;

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
        AppComponentsModule,
        MatSnackBarModule,
      ],
      declarations: [ProjectNotesDetailsComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        ProjectNotesOperationMessageService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotesDetailsComponent);
    component = fixture.componentInstance;
    component.project = { name: 'Test' } as Project;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
