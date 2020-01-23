import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '@app/shared/app-material.module';
import { ProjectScanStatusTypeComponent } from './project-scan-status-type.component';

describe('ProjectScanStatusTypeComponent', () => {
  let component: ProjectScanStatusTypeComponent;
  let fixture: ComponentFixture<ProjectScanStatusTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      declarations: [ProjectScanStatusTypeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScanStatusTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
