import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { SecurityScanResultItem, SecurityScanResultItemApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class SecurityScanResultItemService extends EntityCollectionServiceBase<SecurityScanResultItem>
  implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: SecurityScanResultItemApiService,
  ) {
    super('SecurityScanResultItem', serviceElementsFactory);
  }
}
