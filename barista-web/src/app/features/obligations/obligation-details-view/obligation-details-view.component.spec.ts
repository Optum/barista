import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligationDetailsViewComponent } from './obligation-details-view.component';

describe('ObligationDetailsViewComponent', () => {
  let component: ObligationDetailsViewComponent;
  let fixture: ComponentFixture<ObligationDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObligationDetailsViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObligationDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
