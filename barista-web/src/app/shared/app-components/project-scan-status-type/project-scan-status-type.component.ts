import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-scan-status-type',
  templateUrl: './project-scan-status-type.component.html',
  styleUrls: ['./project-scan-status-type.component.scss'],
})
export class ProjectScanStatusTypeComponent implements OnInit {
  constructor() {}
  @Input() statusCode: string;

  ngOnInit() {}
}
