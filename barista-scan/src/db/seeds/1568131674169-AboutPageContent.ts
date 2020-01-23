// tslint:disable:max-line-length
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { SystemConfiguration } from '../../models';

export class AboutPageContent1568131674169 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    const config = await this.connection.getRepository(SystemConfiguration).findOne({ where: { isDefault: true } });
    config.aboutPageContent = null;
    await this.connection.getRepository(SystemConfiguration).save(config);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const config = await this.connection.getRepository(SystemConfiguration).findOne({ where: { isDefault: true } });
    config.aboutPageContent =
      '# Welcome to the Barista system.\n## About\n* The Barista system is an automated license/vulnerability detection platform.';
    await this.connection.getRepository(SystemConfiguration).save(config);
  }
}
