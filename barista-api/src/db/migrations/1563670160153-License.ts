// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class License1563670160153 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "FK_4e637a75eb78b4f5809bbe0d3b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "FK_410df131f3526e8d7034d08ffec"`,
    );
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "reference_url"`);
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "homepage_url"`);
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "text_url"`);
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "desc"`);
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "PK_f168ac1ca5ba87286d03b2ef905"`);
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "id"`);
    await queryRunner.query(`DROP INDEX "IDX_4e637a75eb78b4f5809bbe0d3b"`);
    await queryRunner.query(`DROP INDEX "IDX_410df131f3526e8d7034d08ffe"`);
    await queryRunner.query(`DROP TABLE "license_obligations_obligation"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "license_obligations_obligation" ("licenseId" integer NOT NULL, "obligationId" integer NOT NULL, CONSTRAINT "PK_49f1777354b49954758479f7d8a" PRIMARY KEY ("licenseId", "obligationId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_410df131f3526e8d7034d08ffe" ON "license_obligations_obligation" ("licenseId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4e637a75eb78b4f5809bbe0d3b" ON "license_obligations_obligation" ("obligationId") `,
    );
    await queryRunner.query(`ALTER TABLE "license" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "PK_f168ac1ca5ba87286d03b2ef905" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "license" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "license" ADD "updated_at" TIMESTAMP DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "license" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "license" ADD "code" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "license" ADD "desc" character varying NULL`);
    await queryRunner.query(`ALTER TABLE "license" ADD "text_url" character varying`);
    await queryRunner.query(`ALTER TABLE "license" ADD "homepage_url" character varying`);
    await queryRunner.query(`ALTER TABLE "license" ADD "reference_url" character varying`);
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "FK_410df131f3526e8d7034d08ffec" FOREIGN KEY ("licenseId") REFERENCES "license"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "FK_4e637a75eb78b4f5809bbe0d3b3" FOREIGN KEY ("obligationId") REFERENCES "obligation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
