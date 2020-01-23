import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { Obligation, ObligationApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ObligationService extends EntityCollectionServiceBase<Obligation> implements PublicApiService {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, public apiService: ObligationApiService) {
    super('Obligation', serviceElementsFactory);
  }
}
