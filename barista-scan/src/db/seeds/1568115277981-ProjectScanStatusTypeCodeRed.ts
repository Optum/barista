import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { ProjectScanStatusType } from '../../models';

export class ProjectScanStatusTypeCodeRed1568115277981 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    const status = await this.connection.getRepository(ProjectScanStatusType).findOne({ where: { code: 'red' } });
    status.code = 'red';
    await this.connection.getRepository(ProjectScanStatusType).save(status);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const status = await this.connection.getRepository(ProjectScanStatusType).findOne({ where: { code: 'red' } });
    status.code = 'red';
    await this.connection.getRepository(ProjectScanStatusType).save(status);
  }
}
