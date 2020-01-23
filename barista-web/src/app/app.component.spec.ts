import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/features/auth/auth.service';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { AppMaterialModule } from '@app/shared/app-material.module';
import { FooterComponent } from '@app/shared/layout/footer/footer.component';
import { HeaderComponent } from '@app/shared/layout/header/header.component';
import { SideNavComponent } from '@app/shared/layout/side-nav/side-nav.component';
import { NavService } from '@app/shared/nav/nav.service';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppMaterialModule,
        HttpClientModule,
        AppComponentsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot(entityConfig),
        EntityStoreModule,
        HttpClientTestingModule,
        LayoutModule,
      ],
      declarations: [AppComponent, HeaderComponent, FooterComponent, SideNavComponent],
      providers: [
        NavService,
        {
          provide: AuthService,
          useValue: {
            userInfo: jest.fn().mockReturnValueOnce({ role: 'Admin' }),
          },
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'barista-web'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('barista-web');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1 span').textContent).toContain('Barista');
  });
});
