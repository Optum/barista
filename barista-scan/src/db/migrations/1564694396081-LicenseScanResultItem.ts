// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LicenseScanResultItem1564694396081 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP CONSTRAINT "FK_8346f3c651f89ce30245975b50a"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "licenseScanId"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "raw_results"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "path"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "displayIdentifier"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "item_type"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP CONSTRAINT "PK_21a9d2c4957704ee97a794a0289"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "id"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "license_scan_result_item" ADD CONSTRAINT "PK_21a9d2c4957704ee97a794a0289" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "updated_at" TIMESTAMP DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "item_type" character varying`);
    await queryRunner.query(
      `ALTER TABLE "license_scan_result_item" ADD "displayIdentifier" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "description" character varying`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "path" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "raw_results" jsonb`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "licenseScanId" integer`);
    await queryRunner.query(
      `ALTER TABLE "license_scan_result_item" ADD CONSTRAINT "FK_8346f3c651f89ce30245975b50a" FOREIGN KEY ("licenseScanId") REFERENCES "license_scan_result"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
