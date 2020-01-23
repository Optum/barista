import { Component, OnInit } from '@angular/core';
import { ChartBaseComponent } from '@app/shared/app-components/charts/chart-base/chart-base.component';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent extends ChartBaseComponent implements OnInit {
  constructor() {
    super();
  }

  public chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
  };
  chartType: ChartType = 'pie';

  ngOnInit() {}
}
