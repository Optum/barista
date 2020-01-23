import { MigrationInterface, QueryRunner } from 'typeorm';

export class BomLicenseExceptionPath1569862660187 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP COLUMN "licenseItemPath"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_license_exception" ADD "licenseItemPath" character varying NOT NULL`);
  }
}
