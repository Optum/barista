import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { LicenseStatusDeploymentType, LicenseStatusDeploymentTypeApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class LicenseStatusDeploymentTypeService extends EntityCollectionServiceBase<LicenseStatusDeploymentType>
  implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: LicenseStatusDeploymentTypeApiService,
  ) {
    super('LicenseStatusDeploymentType', serviceElementsFactory);
  }
}
