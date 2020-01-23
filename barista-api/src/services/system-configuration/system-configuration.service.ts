import { SystemConfiguration } from '@app/models';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class SystemConfigurationService extends AppServiceBase<SystemConfiguration> {
  constructor(@InjectRepository(SystemConfiguration) repo) {
    super(repo);
  }

  static async defaultConfiguration(repo: Repository<SystemConfiguration> = null) {
    let db = repo;
    if (!db) {
      db = (await getConnection()).getRepository(SystemConfiguration);
    }

    return db.findOne({ where: { isDefault: true } });
  }
}
