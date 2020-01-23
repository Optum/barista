import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { ObjectDetailsComponent } from '@app/shared/app-components/object-details/object-details.component';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { SafePipeModule } from 'safe-pipe';
import { SecurityScanResultItemDetailsComponent } from './security-scan-result-item-details.component';

describe('SecurityScanResultItemDetailsComponent', () => {
  let component: SecurityScanResultItemDetailsComponent;
  let fixture: ComponentFixture<SecurityScanResultItemDetailsComponent>;

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
        SafePipeModule,
        PrettyJsonModule,
        AppMaterialModule,
        RouterTestingModule,
        AppComponentsModule,
        EntityDataModule.forRoot(entityConfig),
        EntityStoreModule,
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
      ],
      declarations: [SecurityScanResultItemDetailsComponent, ObjectDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityScanResultItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
