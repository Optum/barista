import { Injectable } from '@angular/core';
import { PublicApiService } from '@app/shared/+state/public-api-service';
import { OutputFormatType, OutputFormatTypeApiService } from '@app/shared/api';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class OutputFormatTypeService extends EntityCollectionServiceBase<OutputFormatType> implements PublicApiService {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    public apiService: OutputFormatTypeApiService,
  ) {
    super('OutputFormatType', serviceElementsFactory);
  }
}
