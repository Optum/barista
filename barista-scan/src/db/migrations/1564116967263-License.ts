// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class License1564116967263 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP CONSTRAINT "FK_9476224288d902a5911ce4ba17c"`);
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" DROP COLUMN "licenseId"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "license_scan_result_item" ADD "licenseId" integer`);
    await queryRunner.query(
      `ALTER TABLE "license_scan_result_item" ADD CONSTRAINT "FK_9476224288d902a5911ce4ba17c" FOREIGN KEY ("licenseId") REFERENCES "license"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
