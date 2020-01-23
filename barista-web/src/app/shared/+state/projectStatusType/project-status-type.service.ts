import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { ProjectStatusType, ProjectStatusTypeApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ProjectStatusTypeService extends EntityCollectionServiceBase<ProjectStatusType>
  implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: ProjectStatusTypeApiService,
  ) {
    super('ProjectStatusType', serviceElementsFactory);
  }
}
