// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProjectImport1571104768973 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_manual_license" ALTER COLUMN "reference_url" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "wasImported"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "importMetaData"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" ADD "importMetaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "project" ADD "wasImported" boolean`);
    await queryRunner.query(`ALTER TABLE "bom_manual_license" ALTER COLUMN "reference_url" DROP NOT NULL`);
  }
}
