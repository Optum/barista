// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecurityScanResultItemStatus1567780980281 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" DROP CONSTRAINT "FK_aa38e3ff3d019729a85894e8eff"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" DROP COLUMN "project_scan_status_type_code"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "security_scan_result_item" ADD "project_scan_status_type_code" character varying(64)`,
    );
    await queryRunner.query(
      `ALTER TABLE "security_scan_result_item" ADD CONSTRAINT "FK_aa38e3ff3d019729a85894e8eff" FOREIGN KEY ("project_scan_status_type_code") REFERENCES "project_scan_status_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
