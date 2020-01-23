// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ScanTiming1564106925402 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "completed_at"`);
    await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "started_at"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP COLUMN "completed_at"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP COLUMN "started_at"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "completed_at"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "started_at"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "started_at" TIMESTAMP DEFAULT null`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "completed_at" TIMESTAMP DEFAULT null`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" ADD "started_at" TIMESTAMP DEFAULT null`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" ADD "completed_at" TIMESTAMP DEFAULT null`);
    await queryRunner.query(`ALTER TABLE "scan" ADD "started_at" TIMESTAMP DEFAULT null`);
    await queryRunner.query(`ALTER TABLE "scan" ADD "completed_at" TIMESTAMP DEFAULT null`);
  }
}
