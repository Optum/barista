import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { Project, ProjectApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ProjectService extends EntityCollectionServiceBase<Project> implements PublicApiService {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, public apiService: ProjectApiService) {
    super('Project', serviceElementsFactory);
  }
}
