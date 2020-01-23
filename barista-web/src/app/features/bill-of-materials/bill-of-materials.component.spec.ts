import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BomGroupedLicensesComponent } from '@app/features/bill-of-materials/bom-grouped-license/bom-grouped-licenses.component';
import { BomLicenseExceptionsComponent } from '@app/features/bill-of-materials/bom-license-exceptions/bom-license-exceptions.component';
import { BomLicensesComponent } from '@app/features/bill-of-materials/bom-licenses/bom-licenses.component';
import { BomManualLicensesComponent } from '@app/features/bill-of-materials/bom-manual-licenses/bom-manual-licenses.component';
import { BomSecurityExceptionComponent } from '@app/features/bill-of-materials/bom-security-exception/bom-security-exception.component';
import { BomVulnerabilitiesComponent } from '@app/features/bill-of-materials/bom-vulnerabilities/bom-vulnerabilities.component';
import { ProjectStatusComponent } from '@app/features/projects/project-details/project-status/project-status.component';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { AppServicesModule } from '@app/shared/services/app-services.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BillOfMaterialsComponent } from './bill-of-materials.component';

describe('BillOfMaterialsComponent', () => {
  let component: BillOfMaterialsComponent;
  let fixture: ComponentFixture<BillOfMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponentsModule,
        AppMaterialModule,
        AppServicesModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [
        BillOfMaterialsComponent,
        BomGroupedLicensesComponent,
        BomLicensesComponent,
        BomLicenseExceptionsComponent,
        BomManualLicensesComponent,
        BomVulnerabilitiesComponent,
        BomSecurityExceptionComponent,
        ProjectStatusComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: key => '1' },
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillOfMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
