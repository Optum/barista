import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { LicenseScanResultItem, LicenseScanResultItemApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class LicenseScanResultItemService extends EntityCollectionServiceBase<LicenseScanResultItem>
  implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: LicenseScanResultItemApiService,
  ) {
    super('LicenseScanResultItem', serviceElementsFactory);
  }
}
