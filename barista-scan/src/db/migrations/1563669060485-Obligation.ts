// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Obligation1563669060485 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "obligation" DROP COLUMN "desc"`);
    await queryRunner.query(`ALTER TABLE "obligation" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "obligation" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "obligation" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "obligation" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "obligation" DROP CONSTRAINT "PK_3a70be17386980c9fec1df4d25d"`);
    await queryRunner.query(`ALTER TABLE "obligation" DROP COLUMN "id"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "obligation" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "obligation" ADD CONSTRAINT "PK_3a70be17386980c9fec1df4d25d" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "obligation" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "obligation" ADD "updated_at" TIMESTAMP DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "obligation" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "obligation" ADD "code" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "obligation" ADD "desc" character varying NOT NULL`);
  }
}
