import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { SecurityScanResult, SecurityScanResultApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class SecurityScanResultService extends EntityCollectionServiceBase<SecurityScanResult>
  implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: SecurityScanResultApiService,
  ) {
    super('SecurityScanResult', serviceElementsFactory);
  }
}
