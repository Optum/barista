// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultLicense1570209086584 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_manual_license" DROP COLUMN "is_default"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_manual_license" ADD "is_default" boolean NOT NULL DEFAULT false`);
  }
}
