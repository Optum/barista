import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponent } from '@app/shared/app-components/charts/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ProjectStatsComponent } from './project-stats.component';

describe('ProjectStatsComponent', () => {
  let component: ProjectStatsComponent;
  let fixture: ComponentFixture<ProjectStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartsModule],
      declarations: [ProjectStatsComponent, PieChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
