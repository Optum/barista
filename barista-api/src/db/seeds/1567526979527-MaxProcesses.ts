import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { SystemConfiguration } from '../../models';

export class MaxProcesses1567526979527 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    const config = await this.connection.getRepository(SystemConfiguration).findOne({ where: { isDefault: true } });
    config.maxProcesses = null;
    await this.connection.getRepository(SystemConfiguration).save(config);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const config = await this.connection.getRepository(SystemConfiguration).findOne({ where: { isDefault: true } });
    config.maxProcesses = 4;
    await this.connection.getRepository(SystemConfiguration).save(config);
  }
}
