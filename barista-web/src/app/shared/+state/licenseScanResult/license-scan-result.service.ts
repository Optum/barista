import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { LicenseScanResult, LicenseScanResultApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class LicenseScanResultService extends EntityCollectionServiceBase<LicenseScanResult>
  implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: LicenseScanResultApiService,
  ) {
    super('LicenseScanResult', serviceElementsFactory);
  }
}
