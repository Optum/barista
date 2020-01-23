// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Authentication1566180038498 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "project_user_idx1"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "userId"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "user_name" character varying NOT NULL, "display_name" character varying NOT NULL DEFAULT '', "password_hash" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "project" ADD "userId" text NOT NULL DEFAULT ''`);
    await queryRunner.query(`CREATE INDEX "project_user_idx1" ON "project" ("userId") `);
  }
}
