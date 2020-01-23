// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProjectDevelopmentType1569282760918 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3b0bc263dbf8a61e0c5bbb947a6"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "development_type_code"`);
    await queryRunner.query(`DROP TABLE "project_development_type"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "project_development_type" ("code" character varying(64) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "description" text NOT NULL DEFAULT '', "is_default" boolean NOT NULL DEFAULT false, "sort_order" integer DEFAULT 0, "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_3b0bc263dbf8a61e0c5bbb947a6" UNIQUE ("code"), CONSTRAINT "PK_3b0bc263dbf8a61e0c5bbb947a6" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(`ALTER TABLE "project" ADD "development_type_code" character varying(64)`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_3b0bc263dbf8a61e0c5bbb947a6" FOREIGN KEY ("development_type_code") REFERENCES "project_development_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
