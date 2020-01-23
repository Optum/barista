// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LicenseScanResultItemStatus1567780286917 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP CONSTRAINT "FK_aebaac4592bd7ed34f29af015c3"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "project_scan_status_type_code"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "license_scan_result_item" ADD "project_scan_status_type_code" character varying(64)`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_scan_result_item" ADD CONSTRAINT "FK_aebaac4592bd7ed34f29af015c3" FOREIGN KEY ("project_scan_status_type_code") REFERENCES "project_scan_status_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
