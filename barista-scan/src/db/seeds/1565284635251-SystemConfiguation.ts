import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { SystemConfiguration } from '../../models';

export class SystemConfiguation1565284635251 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(SystemConfiguration).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(SystemConfiguration).save({
      code: 'default',
      description: 'The default configuration for the system.',
      isDefault: true,
    });
  }
}
