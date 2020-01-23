import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublisherDetails1574383096925 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "publisherUrl"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "publisherName"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "publisherEmail"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "publisherEmail" character varying`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "publisherName" character varying`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "publisherUrl" character varying`);
  }
}
