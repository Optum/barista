import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdditionalMenus1571921266791 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "about_menu"`);
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "contact_menu"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "about_menu" jsonb`);
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "contact_menu" jsonb`);
  }
}
