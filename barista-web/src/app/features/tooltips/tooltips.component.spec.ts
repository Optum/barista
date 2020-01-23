import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipsComponent } from '@app/features/tooltips/tooltips.component';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('ToolTipComponent', () => {
  let component: TooltipsComponent;
  let fixture: ComponentFixture<TooltipsComponent>;

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
        NgxDatatableModule,
        AppMaterialModule,
        AppComponentsModule,
      ],
      declarations: [TooltipsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
