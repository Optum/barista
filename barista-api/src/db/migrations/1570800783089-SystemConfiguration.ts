import { MigrationInterface, QueryRunner } from 'typeorm';

export class SystemConfiguration1570800783089 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "help_menu"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "help_menu" jsonb`);
  }
}
