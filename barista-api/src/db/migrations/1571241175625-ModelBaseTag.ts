import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModelBaseTag1571241175625 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "vulnerability_status_deployment_type" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "vulnerability_status_deployment_type" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "license_status_deployment_type" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "license_status_deployment_type" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "obligation" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "obligation" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "project_note" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "project_note" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "bom_manual_license" DROP COLUMN "metaData"`);
    await queryRunner.query(`ALTER TABLE "bom_manual_license" DROP COLUMN "tag"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_manual_license" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "bom_manual_license" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "project_note" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "project_note" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "project" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "project" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "security_scan_result" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "scan" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "scan" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "license_scan_result" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "obligation" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "obligation" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "license" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "license" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "license_status_deployment_type" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "license_status_deployment_type" ADD "metaData" jsonb`);
    await queryRunner.query(`ALTER TABLE "vulnerability_status_deployment_type" ADD "tag" character varying`);
    await queryRunner.query(`ALTER TABLE "vulnerability_status_deployment_type" ADD "metaData" jsonb`);
  }
}
