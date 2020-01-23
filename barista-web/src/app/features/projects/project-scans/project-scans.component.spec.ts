import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/features/auth/auth.service';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProjectScansComponent } from './project-scans.component';

describe('ProjectScansComponent', () => {
  let component: ProjectScansComponent;
  let fixture: ComponentFixture<ProjectScansComponent>;

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
        NgxDatatableModule,
        AppMaterialModule,
        AppComponentsModule,
        MatSnackBarModule,
      ],
      declarations: [ProjectScansComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            userInfo: jest.fn().mockReturnValueOnce({ role: 'Admin' }),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
