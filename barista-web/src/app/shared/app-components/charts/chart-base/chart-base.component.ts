import { Input, OnInit, Directive } from '@angular/core';

@Directive()
export abstract class ChartBaseComponent implements OnInit {
  protected constructor() {}
  @Input() data: number[];
  @Input() labels: string[];
  @Input() legend = false;

  ngOnInit() {}
}
