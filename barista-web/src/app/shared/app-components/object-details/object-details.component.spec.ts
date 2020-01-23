import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '@app/shared/app-material.module';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { SafePipeModule } from 'safe-pipe';
import { ObjectDetailsComponent } from './object-details.component';

describe('ObjectDetailsComponent', () => {
  let component: ObjectDetailsComponent;
  let fixture: ComponentFixture<ObjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SafePipeModule, PrettyJsonModule, AppMaterialModule],
      declarations: [ObjectDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
