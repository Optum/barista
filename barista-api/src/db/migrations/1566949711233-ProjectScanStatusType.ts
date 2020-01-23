// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProjectScanStatusType1566949711233 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "project_scan_status_type"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "project_scan_status_type" ("code" character varying(64) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "description" text NOT NULL DEFAULT '', "is_default" boolean NOT NULL DEFAULT false, "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_e9bac02590bd0d3c482807f5bc2" UNIQUE ("code"), CONSTRAINT "PK_e9bac02590bd0d3c482807f5bc2" PRIMARY KEY ("code"))`,
    );
  }
}
