import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { DeploymentType } from '../../models';
import { DeploymentTypeSeed } from './DeploymentType.seed';

export class DeploymentModel1564097247773 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(DeploymentType).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(DeploymentType).save(DeploymentTypeSeed);
  }
}
