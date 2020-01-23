// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AskIdDisplayName1578943828432 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "ask_id_display_name"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "system_configuration" ADD "ask_id_display_name" character varying DEFAULT 'Ask ID'`,
    );
  }
}
