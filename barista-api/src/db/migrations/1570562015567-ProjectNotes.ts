// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProjectNotes1570562015567 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project_note" DROP CONSTRAINT "FK_8d649d61556cab4b713e453411b"`);
    await queryRunner.query(`DROP TABLE "project_note"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "project_note" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "note" text NOT NULL DEFAULT '', "user_id" character varying NOT NULL, "projectId" integer, CONSTRAINT "PK_787a6583b216ce6998c59d324df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_note" ADD CONSTRAINT "FK_8d649d61556cab4b713e453411b" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
