import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/features/auth/auth.service';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { AppServicesModule } from '@app/shared/services/app-services.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BomVulnerabilitiesComponent } from './bom-vulnerabilities.component';

describe('BomVulnerabilitiesComponent', () => {
  let component: BomVulnerabilitiesComponent;
  let fixture: ComponentFixture<BomVulnerabilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponentsModule,
        AppMaterialModule,
        AppServicesModule,
        HttpClientTestingModule,
        MatDialogModule,
        NgxDatatableModule,
        RouterTestingModule,
        RouterTestingModule,
      ],
      declarations: [BomVulnerabilitiesComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: key => '1' },
            },
          },
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
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
    fixture = TestBed.createComponent(BomVulnerabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
