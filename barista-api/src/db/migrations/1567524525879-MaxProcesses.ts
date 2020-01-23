import { MigrationInterface, QueryRunner } from 'typeorm';

export class MaxProcesses1567524525879 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "max_processes"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "max_processes" integer DEFAULT 4`);
  }
}
