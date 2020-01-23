import { Obligation } from '@app/models';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ObligationService extends AppServiceBase<Obligation> {
  constructor(@InjectRepository(Obligation) repo) {
    super(repo);
  }
}
