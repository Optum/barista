// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeLicenseDelete1571244754372 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "license_status_deployment_type" DROP CONSTRAINT "FK_ab2ce6855562962ab0dcf2c9093"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_status_deployment_type" ADD CONSTRAINT "FK_ab2ce6855562962ab0dcf2c9093" FOREIGN KEY ("license_code") REFERENCES "license"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "license_status_deployment_type" DROP CONSTRAINT "FK_ab2ce6855562962ab0dcf2c9093"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_status_deployment_type" ADD CONSTRAINT "FK_ab2ce6855562962ab0dcf2c9093" FOREIGN KEY ("license_code") REFERENCES "license"("code") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
