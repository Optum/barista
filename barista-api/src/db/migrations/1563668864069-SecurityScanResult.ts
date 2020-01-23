// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecurityScanResult1563668864069 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP CONSTRAINT "FK_dd9014ea526791fce4b9bd4928a"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "scanId"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "html_results"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "json_results"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "scan_tool"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP CONSTRAINT "PK_923566ed79959eb5a8c928d5746"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "id"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "security_scan_result" ADD CONSTRAINT "PK_923566ed79959eb5a8c928d5746" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "updated_at" TIMESTAMP DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "scan_tool" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "json_results" jsonb`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "html_results" text`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "scanId" integer`);
    await queryRunner.query(
      `ALTER TABLE "security_scan_result" ADD CONSTRAINT "FK_dd9014ea526791fce4b9bd4928a" FOREIGN KEY ("scanId") REFERENCES "scan"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
