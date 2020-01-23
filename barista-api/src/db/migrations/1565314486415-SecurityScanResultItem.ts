// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecurityScanResultItem1565314486415 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "security_scan_result_item" DROP CONSTRAINT "FK_e731bad6f642b91ac57053754ce"`);
    await queryRunner.query(`DROP TABLE "security_scan_result_item"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "security_scan_result_item" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "item_type" character varying, "displayIdentifier" character varying NOT NULL, "description" character varying, "path" character varying NOT NULL, "raw_results" jsonb, "reference_url" character varying, "securityScanId" integer, CONSTRAINT "PK_331e66edcba66c3a61c47dfd21d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "security_scan_result_item" ADD CONSTRAINT "FK_e731bad6f642b91ac57053754ce" FOREIGN KEY ("securityScanId") REFERENCES "security_scan_result"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
