import { MigrationInterface, QueryRunner } from 'typeorm';

export class AboutPageContent1568131572189 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "about_page_content"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "about_page_content" text`);
  }
}
