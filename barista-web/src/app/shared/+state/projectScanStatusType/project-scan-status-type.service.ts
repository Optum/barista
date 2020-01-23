import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { ProjectScanStatusType, ProjectScanStatusTypeApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ProjectScanStatusTypeService extends EntityCollectionServiceBase<ProjectScanStatusType>
  implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: ProjectScanStatusTypeApiService,
  ) {
    super('ProjectScanStatusType', serviceElementsFactory);
  }
}
