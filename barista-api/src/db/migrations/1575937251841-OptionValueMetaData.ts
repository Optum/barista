import { MigrationInterface, QueryRunner } from 'typeorm';

export class OptionValueMetaData1575937251841 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "obligation_type" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result_item_status_type" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "project_status_type" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "project_development_type" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "output_format_type" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "project_scan_status_type" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "deployment_type" DROP COLUMN "metaData"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "deployment_type" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "project_scan_status_type" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "output_format_type" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "package_manager" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "project_development_type" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "project_status_type" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "security_scan_result_item_status_type" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "obligation_type" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "metaData" jsonb`);
  }
}
