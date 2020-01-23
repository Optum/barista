// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ScanDeploymentType1567782034435 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "FK_ecbb3fa4f48d8f2531f45312797"`);
    await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "deploymentTypeCode"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "scan" ADD "deploymentTypeCode" character varying(64)`);
    await queryRunner.query(
      `ALTER TABLE "scan" ADD CONSTRAINT "FK_ecbb3fa4f48d8f2531f45312797" FOREIGN KEY ("deploymentTypeCode") REFERENCES "deployment_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
