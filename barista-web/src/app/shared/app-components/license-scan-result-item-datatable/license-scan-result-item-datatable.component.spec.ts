import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/features/auth/auth.service';
import { LicenseScanResultItemApiService } from '@app/shared/api';
import { AppDatatableComponent as AppDataTableComponent } from '@app/shared/app-components/datatable/app-datatable.component';
import { ProjectScanStatusTypeComponent } from '@app/shared/app-components/project-scan-status-type/project-scan-status-type.component';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { of } from 'rxjs';
import { LicenseScanResultItemDatatableComponent } from './license-scan-result-item-datatable.component';

describe('LicenseScanResultItemDatatableComponent', () => {
  let component: LicenseScanResultItemDatatableComponent;
  let fixture: ComponentFixture<LicenseScanResultItemDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, NgxDatatableModule, AppMaterialModule],
      declarations: [AppDataTableComponent, LicenseScanResultItemDatatableComponent, ProjectScanStatusTypeComponent],
      providers: [
        {
          provide: LicenseScanResultItemApiService,
          useValue: {
            licenseScanResultItemGet: jest.fn().mockReturnValueOnce(of([])),
          },
        },
        AuthService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseScanResultItemDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
