import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Project } from '@app/shared/api';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { ProjectStatusComponent } from './project-status.component';

describe('ProjectStatusComponent', () => {
  let component: ProjectStatusComponent;
  let fixture: ComponentFixture<ProjectStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppComponentsModule],
      declarations: [ProjectStatusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatusComponent);
    component = fixture.componentInstance;
    component.project = { id: 0 } as Project;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
