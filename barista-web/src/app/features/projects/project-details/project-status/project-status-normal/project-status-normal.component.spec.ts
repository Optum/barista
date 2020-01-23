import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Project } from '@app/shared/api';
import { AppComponentsModule } from '@app/shared/app-components/app-components.module';
import { ProjectStatusNormalComponent } from './project-status-normal.component';

describe('ProjectStatusNormalComponent', () => {
  let component: ProjectStatusNormalComponent;
  let fixture: ComponentFixture<ProjectStatusNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppComponentsModule],
      declarations: [ProjectStatusNormalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatusNormalComponent);
    component = fixture.componentInstance;
    component.project = { id: 0 } as Project;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
