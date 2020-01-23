// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LicenseScanResult1563669273705 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP CONSTRAINT "FK_46141bcc36c5c469fcb25fb7e92"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP COLUMN "scanId"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP COLUMN "json_results"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP COLUMN "scan_tool"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP CONSTRAINT "PK_84357efbde1881e508da9007d83"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP COLUMN "id"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license_scan_result" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "license_scan_result" ADD CONSTRAINT "PK_84357efbde1881e508da9007d83" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "license_scan_result" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" ADD "updated_at" TIMESTAMP DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" ADD "scan_tool" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" ADD "json_results" jsonb`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" ADD "scanId" integer`);
    await queryRunner.query(
      `ALTER TABLE "license_scan_result" ADD CONSTRAINT "FK_46141bcc36c5c469fcb25fb7e92" FOREIGN KEY ("scanId") REFERENCES "scan"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
