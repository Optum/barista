import { MigrationInterface, QueryRunner } from 'typeorm';

export class FuzzMatched1566824159958 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "unknown_license"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "fuzzy_matched"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "license_scan_result_item" ADD "fuzzy_matched" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "license" ADD "unknown_license" boolean NOT NULL DEFAULT false`);
  }
}
