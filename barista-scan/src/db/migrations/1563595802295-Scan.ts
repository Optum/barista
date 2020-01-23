// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Scan1563595802295 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "FK_025ce3bc957f2ed4f953ecb7b1e"`);
    await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "projectId"`);
    await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "job_info"`);
    await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84"`);
    await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "id"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "scan" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "scan" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "scan" ADD "updated_at" TIMESTAMP DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "scan" ADD "job_info" jsonb`);
    await queryRunner.query(`ALTER TABLE "scan" ADD "projectId" integer`);
    await queryRunner.query(
      `ALTER TABLE "scan" ADD CONSTRAINT "FK_025ce3bc957f2ed4f953ecb7b1e" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
