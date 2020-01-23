// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ToolTips1576129306054 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "tool_tip"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "tool_tip" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "metaData" jsonb, "tag" character varying, "updated_at" TIMESTAMP DEFAULT now(), "content" text NOT NULL, "element_name" text NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "page_name" text NOT NULL, CONSTRAINT "PK_c025edfb54efe0cc8ce3e0ce071" PRIMARY KEY ("id"))`,
    );
  }
}
