// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class OptionValueModelBaseSortOrder1566952653053 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "security_scan_result_item_status_type" DROP CONSTRAINT "UQ_a1098c4b4b28e6bf002517083da"`,
    );
    await queryRunner.query(`ALTER TABLE "project_scan_status_type" DROP COLUMN "sort_order"`);
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "sort_order"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result_item_status_type" DROP COLUMN "sort_order"`);
    await queryRunner.query(`ALTER TABLE "obligation_type" DROP COLUMN "sort_order"`);
    await queryRunner.query(`ALTER TABLE "project_status_type" DROP COLUMN "sort_order"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP COLUMN "sort_order"`);
    await queryRunner.query(`ALTER TABLE "output_format_type" DROP COLUMN "sort_order"`);
    await queryRunner.query(`ALTER TABLE "deployment_type" DROP COLUMN "sort_order"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "deployment_type" ADD "sort_order" integer DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "output_format_type" ADD "sort_order" integer DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "package_manager" ADD "sort_order" integer DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "project_status_type" ADD "sort_order" integer DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "obligation_type" ADD "sort_order" integer DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "security_scan_result_item_status_type" ADD "sort_order" integer DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "sort_order" integer DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "project_scan_status_type" ADD "sort_order" integer DEFAULT 0`);
    await queryRunner.query(
      `ALTER TABLE "security_scan_result_item_status_type" ADD CONSTRAINT "UQ_a1098c4b4b28e6bf002517083da" UNIQUE ("code")`,
    );
  }
}
