import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { AppServicesModule } from '@app/shared/services/app-services.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BomLicenseExceptionsComponent } from './bom-license-exceptions.component';

describe('BomLicenseExceptionsComponent', () => {
  let component: BomLicenseExceptionsComponent;
  let fixture: ComponentFixture<BomLicenseExceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxDatatableModule,
        AppMaterialModule,
        AppComponentsModule,
        AppServicesModule,
      ],
      declarations: [BomLicenseExceptionsComponent],
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
    fixture = TestBed.createComponent(BomLicenseExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
