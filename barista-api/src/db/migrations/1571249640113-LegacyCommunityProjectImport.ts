// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LegacyCommunityProjectImport1571249640113 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "legacy_community_project_import"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "legacy_community_project_import" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "metaData" jsonb, "tag" character varying, "updated_at" TIMESTAMP DEFAULT now(), "application_deployment" character varying, "application_desc" character varying, "application_id" character varying, "application_name" character varying, "application_owner_email" character varying, "application_owner_msid" character varying, "component_approval_timestamp" character varying, "component_id" character varying, "component_licenseid" character varying, "component_license" character varying, "component_name" character varying, "component_version" character varying, "data_source" character varying, CONSTRAINT "PK_dcdfbd1297372bea8d8fd90a24a" PRIMARY KEY ("id"))`,
    );
  }
}
