import { MigrationInterface, QueryRunner } from 'typeorm';

export class LicenseIsCdpx1566388242716 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "is_cpdx"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license" ADD "is_cpdx" boolean NOT NULL DEFAULT false`);
  }
}
