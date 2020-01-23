import { MigrationInterface, QueryRunner } from 'typeorm';

export class Project1563594942680 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "git_url"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "configuration"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "id"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "project" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "project" ADD "updated_at" TIMESTAMP DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "project" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "project" ADD "configuration" text NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "project" ADD "git_url" character varying NOT NULL`);
  }
}
