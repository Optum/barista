import { ObligationType } from '@app/models/ObligationType';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ObligationTypeService extends AppServiceBase<ObligationType> {
  constructor(@InjectRepository(ObligationType) repo) {
    super(repo);
  }
}
