import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { SystemConfiguration } from '../../models';

export class SystemConfiguration1567166827261 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    const config = await this.connection.getRepository(SystemConfiguration).findOne({ where: { isDefault: true } });
    config.npmCacheDirectory = null;
    config.npmRegistry = null;
    await this.connection.getRepository(SystemConfiguration).save(config);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const config = await this.connection.getRepository(SystemConfiguration).findOne({ where: { isDefault: true } });
    config.npmCacheDirectory = '/usr/src/app/tools';
    config.npmRegistry = 'https://repo1.uhc.com/artifactory/api/npm/npm-virtual/';
    await this.connection.getRepository(SystemConfiguration).save(config);
  }
}
