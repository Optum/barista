import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { SecurityScanResultItemStatusType, SecurityScanResultItemStatusTypeApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class SecurityScanResultItemStatusTypeService
  extends EntityCollectionServiceBase<SecurityScanResultItemStatusType>
  implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: SecurityScanResultItemStatusTypeApiService,
  ) {
    super('SecurityScanResultItemStatusType', serviceElementsFactory);
  }
}
