import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotesPayload1574204912433 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project_note" DROP COLUMN "notePayload"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project_note" ADD "notePayload" text DEFAULT ''`);
  }
}
