import { PackageManager } from '@app/models/PackageManager';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PackageManagerService extends AppServiceBase<PackageManager> {
  constructor(@InjectRepository(PackageManager) repo) {
    super(repo);
  }
}
