// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class GlobalProjectException1571844974476 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "globalSecurityException"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "globalLicenseException"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" ADD "globalLicenseException" boolean DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "project" ADD "globalSecurityException" boolean DEFAULT false`);
  }
}
