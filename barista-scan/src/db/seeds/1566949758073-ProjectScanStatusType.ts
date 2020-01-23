import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { ProjectScanStatusType } from '../../models';
import { ProjectScanStatusTypeSeed } from './ProjectScanStatusType.seed';

export class ProjectScanStatusType1566949758073 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(ProjectScanStatusType).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(ProjectScanStatusType).save(ProjectScanStatusTypeSeed);
  }
}
