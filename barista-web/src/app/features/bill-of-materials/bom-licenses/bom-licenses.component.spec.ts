import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/features/auth/auth.service';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { AppServicesModule } from '@app/shared/services/app-services.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BomLicensesComponent } from './bom-licenses.component';

describe('BomLicensesComponent', () => {
  let component: BomLicensesComponent;
  let fixture: ComponentFixture<BomLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponentsModule,
        AppMaterialModule,
        AppServicesModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        RouterTestingModule,
      ],
      declarations: [BomLicensesComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: key => '1' },
            },
          },
        },
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
    fixture = TestBed.createComponent(BomLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
