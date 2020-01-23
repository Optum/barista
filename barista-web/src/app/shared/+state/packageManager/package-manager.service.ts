import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { PackageManager, PackageManagerApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class PackageManagerService extends EntityCollectionServiceBase<PackageManager> implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: PackageManagerApiService,
  ) {
    super('PackageManager', serviceElementsFactory);
  }
}
