import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { ProjectDevelopmentType, ProjectDevelopmentTypeApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
// tslint:disable-next-line:max-line-length
export class ProjectDevelopmentTypeService extends EntityCollectionServiceBase<ProjectDevelopmentType>
  implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: ProjectDevelopmentTypeApiService,
  ) {
    super('ProjectDevelopmentType', serviceElementsFactory);
  }
}
