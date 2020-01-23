// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class BomItems1566431628193 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bill_of_materials" DROP CONSTRAINT "FK_8b1c08773411a8690be8246e30c"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" DROP CONSTRAINT "FK_67c83cf33f2709de403df49f89c"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" DROP CONSTRAINT "FK_e429afe5ea2e0227f27f7980878"`);
    await queryRunner.query(`ALTER TABLE "bom_manual_license" DROP CONSTRAINT "FK_7070dc3d60715112084b678c77d"`);
    await queryRunner.query(`ALTER TABLE "bom_manual_license" DROP CONSTRAINT "FK_3f2421a7019cbdb4aad56444a32"`);
    await queryRunner.query(`ALTER TABLE "bom_manual_license" DROP CONSTRAINT "FK_97156ea5aa5f5e2cb546b129192"`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP CONSTRAINT "FK_ade79c0f6f835ab86677dea17d0"`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP CONSTRAINT "FK_9d18dfc6aeb1aff9bb0df49b537"`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP CONSTRAINT "FK_133a2ae9bfb55d46a03d079073c"`);
    await queryRunner.query(`DROP TABLE "bill_of_materials"`);
    await queryRunner.query(`DROP TABLE "bom_security_exception"`);
    await queryRunner.query(`DROP TABLE "bom_manual_license"`);
    await queryRunner.query(`DROP TABLE "bom_license_exception"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "bom_license_exception" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "notes" text NOT NULL DEFAULT '', "user_id" character varying NOT NULL, "billOfMaterialsId" integer, "licenseId" integer NOT NULL, CONSTRAINT "REL_133a2ae9bfb55d46a03d079073" UNIQUE ("user_id"), CONSTRAINT "REL_ade79c0f6f835ab86677dea17d" UNIQUE ("licenseId"), CONSTRAINT "PK_e21431fd66c09b949c9c2c33ef3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bom_manual_license" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "notes" text NOT NULL DEFAULT '', "product_name" character varying NOT NULL, "product_version" character varying NOT NULL, "reference_url" character varying NOT NULL, "user_id" character varying NOT NULL, "billOfMaterialsId" integer, "licenseId" integer NOT NULL, CONSTRAINT "REL_97156ea5aa5f5e2cb546b12919" UNIQUE ("user_id"), CONSTRAINT "PK_9d38b99fd8eae3bd72155466c85" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bom_security_exception" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "notes" text NOT NULL DEFAULT '', "cve_id" character varying, "user_id" character varying NOT NULL, "billOfMaterialsId" integer, CONSTRAINT "REL_e429afe5ea2e0227f27f798087" UNIQUE ("user_id"), CONSTRAINT "PK_771810a2763059cbf8ca5f850f0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bill_of_materials" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "projectId" integer, CONSTRAINT "PK_e81379203e4149d01c634d7e083" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_license_exception" ADD CONSTRAINT "FK_133a2ae9bfb55d46a03d079073c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_license_exception" ADD CONSTRAINT "FK_9d18dfc6aeb1aff9bb0df49b537" FOREIGN KEY ("billOfMaterialsId") REFERENCES "bill_of_materials"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_license_exception" ADD CONSTRAINT "FK_ade79c0f6f835ab86677dea17d0" FOREIGN KEY ("licenseId") REFERENCES "license"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_manual_license" ADD CONSTRAINT "FK_97156ea5aa5f5e2cb546b129192" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_manual_license" ADD CONSTRAINT "FK_3f2421a7019cbdb4aad56444a32" FOREIGN KEY ("billOfMaterialsId") REFERENCES "bill_of_materials"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_manual_license" ADD CONSTRAINT "FK_7070dc3d60715112084b678c77d" FOREIGN KEY ("licenseId") REFERENCES "license"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_security_exception" ADD CONSTRAINT "FK_e429afe5ea2e0227f27f7980878" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_security_exception" ADD CONSTRAINT "FK_67c83cf33f2709de403df49f89c" FOREIGN KEY ("billOfMaterialsId") REFERENCES "bill_of_materials"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bill_of_materials" ADD CONSTRAINT "FK_8b1c08773411a8690be8246e30c" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
