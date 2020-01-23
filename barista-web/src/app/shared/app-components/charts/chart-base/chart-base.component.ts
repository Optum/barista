import { Input, OnInit } from '@angular/core';

export abstract class ChartBaseComponent implements OnInit {
  protected constructor() {}
  @Input() data: number[];
  @Input() labels: string[];
  @Input() legend = false;

  ngOnInit() {}
}
