import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { Project } from '../../models';
import { ProjectSeed } from './Project.seed';

export class Projects1561306152476 implements MigrationInterface {
  connection = getConnection('demo-seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(Project).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(Project).save(ProjectSeed);
  }
}
