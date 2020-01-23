import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductionDeployUrl1579292327046 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "production_deploy_url"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "production_deploy_url" character varying`);
  }
}
