import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { DeploymentType, DeploymentTypeApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class DeploymentTypeService extends EntityCollectionServiceBase<DeploymentType> implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: DeploymentTypeApiService,
  ) {
    super('DeploymentType', serviceElementsFactory);
  }
}
