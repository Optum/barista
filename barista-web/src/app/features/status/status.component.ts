import { Component, OnInit } from '@angular/core';
import { AppStatus, DefaultApiService } from '@app/shared/api';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  status: AppStatus;

  constructor(private defaultApiService: DefaultApiService) {}

  ngOnInit() {
    this.defaultApiService
      .statusGet()
      .pipe(
        first(),
        filter(result => result.appName === 'barista-api'),
      )
      .subscribe(result => (this.status = result));
  }
}
