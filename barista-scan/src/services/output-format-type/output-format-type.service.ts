import { OutputFormatType } from '@app/models/OutputFormatType';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OutputFormatTypeService extends AppServiceBase<OutputFormatType> {
  constructor(@InjectRepository(OutputFormatType) repo) {
    super(repo);
  }
}
