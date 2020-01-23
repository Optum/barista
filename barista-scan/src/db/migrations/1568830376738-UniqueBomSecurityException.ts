// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueBomSecurityException1568830376738 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IDX_67c0ea9cd0c918ad16e37d0420"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_67c0ea9cd0c918ad16e37d0420" ON "bom_security_exception" ("cve_id", "projectId") `,
    );
  }
}
