import { ToolTip } from '@app/models';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ToolTipService extends AppServiceBase<ToolTip> {
  constructor(@InjectRepository(ToolTip) repo) {
    super(repo);
  }
}
