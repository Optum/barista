import { SystemConfiguration, SystemConfigurationApiService } from '@app/shared/api';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { Observable } from 'rxjs';

@Injectable()
export class SystemConfigurationDataService extends DefaultDataService<SystemConfiguration> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private apiService: SystemConfigurationApiService) {
    super('SystemConfiguration', http, httpUrlGenerator);
  }

  getAll(): Observable<SystemConfiguration[]> {
    return this.apiService.systemConfigurationGet();
  }
}
