// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SystemConfiguration1565285303907 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "system_configuration"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "system_configuration" ("code" character varying(64) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "description" text NOT NULL DEFAULT '', "is_default" boolean NOT NULL DEFAULT false, "spdx_license_list_version" character varying, CONSTRAINT "UQ_806be749d87a705a20a6e17512c" UNIQUE ("code"), CONSTRAINT "PK_806be749d87a705a20a6e17512c" PRIMARY KEY ("code"))`,
    );
  }
}
