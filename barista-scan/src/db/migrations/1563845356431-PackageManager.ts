// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PackageManager1563845356431 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_5bed0380181c634d6c9370f19df"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "package_manager_code"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "package_root"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "dotnet_sln_file"`);
    await queryRunner.query(`DROP TABLE "package_manager"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "package_manager" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_01d7cfb7367a2fb4cc22892d6da" UNIQUE ("name"), CONSTRAINT "UQ_f21c96212fbb573f8736b8975aa" UNIQUE ("code"), CONSTRAINT "PK_2a91771bfbb2d834f1c86b853f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "project" ADD "dotnet_sln_file" character varying`);
    await queryRunner.query(`ALTER TABLE "project" ADD "package_root" character varying`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD "package_manager_code" character varying NOT NULL DEFAULT 'none'`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_5bed0380181c634d6c9370f19df" FOREIGN KEY ("package_manager_code") REFERENCES "package_manager"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
