import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { ProjectStatusType } from '../../models';
import { ProjectStatusTypeSeed } from './ProjectStatus.seed';

export class ProjectStatus1564535996313 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(ProjectStatusType).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(ProjectStatusType).save(ProjectStatusTypeSeed);
  }
}
