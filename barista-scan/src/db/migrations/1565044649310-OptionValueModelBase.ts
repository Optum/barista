// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class OptionValueModelBase1565044649310 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_fb50f2e406b10942dbef83748a6"`);
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_290d3fcaa1d1ad5185793b93bec"`);
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_178d59cf51fe4406fa362c0b2b4"`);
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_5bed0380181c634d6c9370f19df"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "package_manager_code"`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD "package_manager_code" character varying NOT NULL DEFAULT 'none'`,
    );
    await queryRunner.query(`ALTER TABLE "package_manager" DROP CONSTRAINT "UQ_f21c96212fbb573f8736b8975aa"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP CONSTRAINT "PK_f21c96212fbb573f8736b8975aa"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "package_manager" ADD "code" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "package_manager" ADD CONSTRAINT "UQ_f21c96212fbb573f8736b8975aa" UNIQUE ("code")`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_5bed0380181c634d6c9370f19df" FOREIGN KEY ("package_manager_code") REFERENCES "package_manager"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "output_format_code"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "deployment_type_code"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "project_status_code"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "outputEmail"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "pathToUploadFileForScanning"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "owner"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "currentVersion"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "askID"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP COLUMN "is_default"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "package_manager" ADD "name" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "package_manager" ADD CONSTRAINT "UQ_01d7cfb7367a2fb4cc22892d6da" UNIQUE ("name")`,
    );
    await queryRunner.query(`ALTER TABLE "package_manager" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "package_manager" ADD CONSTRAINT "PK_2a91771bfbb2d834f1c86b853f5" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`DROP TABLE "obligation_type"`);
    await queryRunner.query(`DROP TABLE "output_format_type"`);
    await queryRunner.query(`DROP TABLE "project_status_type"`);
    await queryRunner.query(`DROP TABLE "deployment_type"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "deployment_type" ("code" character varying(64) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "description" text NOT NULL DEFAULT '', "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_60428f364f625bde1e51171168f" UNIQUE ("code"), CONSTRAINT "PK_60428f364f625bde1e51171168f" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_status_type" ("code" character varying(64) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "description" text NOT NULL DEFAULT '', "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_8bcf7f2067cfadd174a2bd22053" UNIQUE ("code"), CONSTRAINT "PK_8bcf7f2067cfadd174a2bd22053" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "output_format_type" ("code" character varying(64) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "description" text NOT NULL DEFAULT '', "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_4274f453356a1de900db4cc66a4" UNIQUE ("code"), CONSTRAINT "PK_4274f453356a1de900db4cc66a4" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "obligation_type" ("code" character varying(64) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "description" text NOT NULL DEFAULT '', "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_ac507b3470a2ce56a2b5478aac5" UNIQUE ("code"), CONSTRAINT "PK_ac507b3470a2ce56a2b5478aac5" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(`ALTER TABLE "package_manager" DROP CONSTRAINT "PK_2a91771bfbb2d834f1c86b853f5"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP CONSTRAINT "UQ_01d7cfb7367a2fb4cc22892d6da"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP COLUMN "name"`);

    await queryRunner.query(`ALTER TABLE "package_manager" ADD "description" text NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "package_manager" ADD "is_default" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "project" ADD "description" text NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "project" ADD "askID" text NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "project" ADD "currentVersion" text DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "project" ADD "owner" text DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "project" ADD "pathToUploadFileForScanning" text DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "project" ADD "outputEmail" text DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "project" ADD "project_status_code" character varying(64)`);
    await queryRunner.query(`ALTER TABLE "project" ADD "deployment_type_code" character varying(64)`);
    await queryRunner.query(`ALTER TABLE "project" ADD "output_format_code" character varying(64)`);

    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_5bed0380181c634d6c9370f19df"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP CONSTRAINT "UQ_f21c96212fbb573f8736b8975aa"`);
    await queryRunner.query(`ALTER TABLE "package_manager" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "package_manager" ADD "code" character varying(64) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "package_manager" ADD CONSTRAINT "PK_f21c96212fbb573f8736b8975aa" PRIMARY KEY ("code")`,
    );
    await queryRunner.query(
      `ALTER TABLE "package_manager" ADD CONSTRAINT "UQ_f21c96212fbb573f8736b8975aa" UNIQUE ("code")`,
    );
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "package_manager_code"`);
    await queryRunner.query(`ALTER TABLE "project" ADD "package_manager_code" character varying(64)`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_5bed0380181c634d6c9370f19df" FOREIGN KEY ("package_manager_code") REFERENCES "package_manager"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_178d59cf51fe4406fa362c0b2b4" FOREIGN KEY ("project_status_code") REFERENCES "project_status_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_290d3fcaa1d1ad5185793b93bec" FOREIGN KEY ("deployment_type_code") REFERENCES "deployment_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_fb50f2e406b10942dbef83748a6" FOREIGN KEY ("output_format_code") REFERENCES "output_format_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
