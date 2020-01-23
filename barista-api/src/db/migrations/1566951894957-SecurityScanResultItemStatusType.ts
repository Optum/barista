// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecurityScanResultItemStatusType1566951894957 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project_scan_status_type" DROP CONSTRAINT "UQ_e9bac02590bd0d3c482807f5bc2"`);
    await queryRunner.query(`DROP TABLE "security_scan_result_item_status_type"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "security_scan_result_item_status_type" ("code" character varying(64) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "description" text NOT NULL DEFAULT '', "is_default" boolean NOT NULL DEFAULT false, "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_a1098c4b4b28e6bf002517083da" UNIQUE ("code"), CONSTRAINT "PK_a1098c4b4b28e6bf002517083da" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_scan_status_type" ADD CONSTRAINT "UQ_e9bac02590bd0d3c482807f5bc2" UNIQUE ("code")`,
    );
  }
}
