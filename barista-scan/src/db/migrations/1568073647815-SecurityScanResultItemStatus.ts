// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecurityScanResultItemStatus1568073647815 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" DROP CONSTRAINT "FK_fa475e591654b4e52c0aa165870"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" DROP COLUMN "security_status_code"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" ADD "security_status_code" character varying(64)`);
    await queryRunner.query(
      `ALTER TABLE "security_scan_result_item" ADD CONSTRAINT "FK_fa475e591654b4e52c0aa165870" FOREIGN KEY ("security_status_code") REFERENCES "security_scan_result_item_status_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
