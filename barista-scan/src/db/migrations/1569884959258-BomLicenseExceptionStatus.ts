// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class BomLicenseExceptionStatus1569884959258 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP CONSTRAINT "FK_c3243e6ea44fbb81c7d2489b8a5"`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP COLUMN "project_scan_status_type_code"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "bom_license_exception" ADD "project_scan_status_type_code" character varying(64)`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_license_exception" ADD CONSTRAINT "FK_c3243e6ea44fbb81c7d2489b8a5" FOREIGN KEY ("project_scan_status_type_code") REFERENCES "project_scan_status_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
