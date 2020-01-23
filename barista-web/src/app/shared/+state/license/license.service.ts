import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { License, LicenseApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class LicenseService extends EntityCollectionServiceBase<License> implements PublicApiService {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, public apiService: LicenseApiService) {
    super('License', serviceElementsFactory);
  }
}
