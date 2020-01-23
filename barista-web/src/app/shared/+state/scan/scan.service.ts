import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { Scan, ScanApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ScanService extends EntityCollectionServiceBase<Scan> implements PublicApiService {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, public apiService: ScanApiService) {
    super('Scan', serviceElementsFactory);
  }
}
