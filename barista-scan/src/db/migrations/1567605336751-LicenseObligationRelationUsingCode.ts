// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LicenseObligationRelationUsingCode1567605336751 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "FK_142d0505733d929219469b98a12"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "FK_2f04d55c0253a16609e1fb111fb"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_142d0505733d929219469b98a1"`);
    await queryRunner.query(`DROP INDEX "IDX_2f04d55c0253a16609e1fb111f"`);
    await queryRunner.query(`ALTER TABLE "obligation" DROP CONSTRAINT "UQ_86bf0585ffc09ef070682c84888"`);
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "PK_9791a06f237e6fede5bb9adb43f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "PK_2f04d55c0253a16609e1fb111fb" PRIMARY KEY ("obligationCode")`,
    );
    await queryRunner.query(`ALTER TABLE "license_obligations_obligation" DROP COLUMN "licenseCode"`);
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "PK_2f04d55c0253a16609e1fb111fb"`,
    );
    await queryRunner.query(`ALTER TABLE "license_obligations_obligation" DROP COLUMN "obligationCode"`);
    await queryRunner.query(`ALTER TABLE "license_obligations_obligation" ADD "obligationId" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "PK_4e637a75eb78b4f5809bbe0d3b3" PRIMARY KEY ("obligationId")`,
    );
    await queryRunner.query(`ALTER TABLE "license_obligations_obligation" ADD "licenseId" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "PK_4e637a75eb78b4f5809bbe0d3b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "PK_49f1777354b49954758479f7d8a" PRIMARY KEY ("licenseId", "obligationId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4e637a75eb78b4f5809bbe0d3b" ON "license_obligations_obligation" ("obligationId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_410df131f3526e8d7034d08ffe" ON "license_obligations_obligation" ("licenseId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "FK_410df131f3526e8d7034d08ffec" FOREIGN KEY ("licenseId") REFERENCES "license"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "FK_4e637a75eb78b4f5809bbe0d3b3" FOREIGN KEY ("obligationId") REFERENCES "obligation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "FK_4e637a75eb78b4f5809bbe0d3b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "FK_410df131f3526e8d7034d08ffec"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_410df131f3526e8d7034d08ffe"`);
    await queryRunner.query(`DROP INDEX "IDX_4e637a75eb78b4f5809bbe0d3b"`);
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "PK_49f1777354b49954758479f7d8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "PK_4e637a75eb78b4f5809bbe0d3b3" PRIMARY KEY ("obligationId")`,
    );
    await queryRunner.query(`ALTER TABLE "license_obligations_obligation" DROP COLUMN "licenseId"`);
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "PK_4e637a75eb78b4f5809bbe0d3b3"`,
    );
    await queryRunner.query(`ALTER TABLE "license_obligations_obligation" DROP COLUMN "obligationId"`);
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD "obligationCode" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "PK_2f04d55c0253a16609e1fb111fb" PRIMARY KEY ("obligationCode")`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD "licenseCode" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" DROP CONSTRAINT "PK_2f04d55c0253a16609e1fb111fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "PK_9791a06f237e6fede5bb9adb43f" PRIMARY KEY ("obligationCode", "licenseCode")`,
    );
    await queryRunner.query(`ALTER TABLE "obligation" ADD CONSTRAINT "UQ_86bf0585ffc09ef070682c84888" UNIQUE ("code")`);
    await queryRunner.query(
      `CREATE INDEX "IDX_2f04d55c0253a16609e1fb111f" ON "license_obligations_obligation" ("obligationCode") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_142d0505733d929219469b98a1" ON "license_obligations_obligation" ("licenseCode") `,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "FK_2f04d55c0253a16609e1fb111fb" FOREIGN KEY ("obligationCode") REFERENCES "obligation"("code") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_obligations_obligation" ADD CONSTRAINT "FK_142d0505733d929219469b98a12" FOREIGN KEY ("licenseCode") REFERENCES "license"("code") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
