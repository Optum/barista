// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class GitUrlNullable1569537685519 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3b0bc263dbf8a61e0c5bbb947a6"`);
    await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "git_url" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "project_development_type" DROP CONSTRAINT "UQ_3b0bc263dbf8a61e0c5bbb947a6"`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_3b0bc263dbf8a61e0c5bbb947a6" FOREIGN KEY ("development_type_code") REFERENCES "project_development_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3b0bc263dbf8a61e0c5bbb947a6"`);
    await queryRunner.query(
      `ALTER TABLE "project_development_type" ADD CONSTRAINT "UQ_3b0bc263dbf8a61e0c5bbb947a6" UNIQUE ("code")`,
    );
    await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "git_url" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_3b0bc263dbf8a61e0c5bbb947a6" FOREIGN KEY ("development_type_code") REFERENCES "project_development_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
