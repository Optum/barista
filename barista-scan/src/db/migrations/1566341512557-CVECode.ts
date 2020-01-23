import { MigrationInterface, QueryRunner } from 'typeorm';

export class CveId1566341512557 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" DROP COLUMN "cve_id"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" ADD "cve_id" character varying`);
  }
}
