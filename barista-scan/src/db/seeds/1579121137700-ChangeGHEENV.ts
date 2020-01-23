// tslint:disable:max-line-length
import { SystemConfiguration } from '../../models';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

// TODO: Remove this migration from the code repository once it has been run
export class ChangeGHEENV1579121137700 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    const config = await this.connection.getRepository(SystemConfiguration).findOne({ where: { isDefault: true } });
    config.githubEnterpriseUrlEnvVar = 'BARISTA_GHE_URL';
    await this.connection.getRepository(SystemConfiguration).save(config);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const config = await this.connection.getRepository(SystemConfiguration).findOne({ where: { isDefault: true } });
    config.githubEnterpriseUrlEnvVar = 'BARISTA_GHE_URL';
    await this.connection.getRepository(SystemConfiguration).save(config);
  }
}
