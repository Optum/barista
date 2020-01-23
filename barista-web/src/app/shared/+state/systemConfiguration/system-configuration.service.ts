import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { SystemConfiguration, SystemConfigurationApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class SystemConfigurationService extends EntityCollectionServiceBase<SystemConfiguration>
  implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: SystemConfigurationApiService,
  ) {
    super('SystemConfiguration', serviceElementsFactory);
  }
}
