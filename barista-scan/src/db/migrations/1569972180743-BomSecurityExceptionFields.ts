// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class BomSecurityExceptionFields1569972180743 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_security_exception" DROP CONSTRAINT "FK_250714517df654377d46215c793"`);
    await queryRunner.query(`DROP INDEX "IDX_18d11e882d2e7d8a65bfaf1c9c"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" DROP COLUMN "project_scan_status_type_code"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" DROP COLUMN "securityItemPath"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_67c0ea9cd0c918ad16e37d0420" ON "bom_security_exception" ("cve_id", "projectId") `,
    );
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    // at this stage we need the table to be empty.
    await queryRunner.query(`TRUNCATE TABLE "bom_security_exception"`);
    await queryRunner.query(`DROP INDEX "IDX_67c0ea9cd0c918ad16e37d0420"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" ADD "securityItemPath" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "bom_security_exception" ADD "project_scan_status_type_code" character varying(64)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_18d11e882d2e7d8a65bfaf1c9c" ON "bom_security_exception" ("cve_id", "projectId", "securityItemPath") `,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_security_exception" ADD CONSTRAINT "FK_250714517df654377d46215c793" FOREIGN KEY ("project_scan_status_type_code") REFERENCES "project_scan_status_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
