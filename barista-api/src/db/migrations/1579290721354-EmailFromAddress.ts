import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailFromAddress1579290721354 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "email_from_address"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "email_from_address" character varying`);
  }
}
