import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecurityItemSeverity1566181109031 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" DROP COLUMN "severity"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" ADD "severity" character varying NOT NULL`);
  }
}
