import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/features/auth/auth.service';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { Project } from '@app/shared/api';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { AppServicesModule } from '@app/shared/services/app-services.module';
import { ProjectNotesOperationMessageService } from '@app/shared/services/ProjectNotesOperationMessageService';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProjectNotesComponent } from './project-notes.component';

describe('ProjectNotesComponent', () => {
  let component: ProjectNotesComponent;
  let fixture: ComponentFixture<ProjectNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        HttpClientTestingModule,
        MatDialogModule,
        NgxDatatableModule,
        RouterTestingModule,
      ],
      declarations: [ProjectNotesComponent],
      providers: [
        {
          provide: ActivatedRoute,
        },
        {
          provide: AuthService,
          useValue: {
            userInfo: jest.fn().mockReturnValueOnce({ role: 'Admin' }),
          },
        },
        ProjectNotesOperationMessageService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotesComponent);
    component = fixture.componentInstance;
    component.project = { id: 1 } as Project;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
