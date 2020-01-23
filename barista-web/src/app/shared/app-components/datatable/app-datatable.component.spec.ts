import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppDatatableComponent } from './app-datatable.component';

describe('AppDatatableComponent', () => {
  let component: AppDatatableComponent;
  let fixture: ComponentFixture<AppDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxDatatableModule],
      declarations: [AppDatatableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
