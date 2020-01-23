// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LicenseStatusDeploymentType1566957873348 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "license_status_deployment_type" DROP CONSTRAINT "FK_9c54c2f2f322a1f91d581248031"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_status_deployment_type" DROP CONSTRAINT "FK_ab2ce6855562962ab0dcf2c9093"`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_status_deployment_type" DROP CONSTRAINT "FK_ddb0ccc318b7ba2b36148814e82"`,
    );
    await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "UQ_f82f810289766bb51218c1654a5"`);
    await queryRunner.query(`DROP TABLE "license_status_deployment_type"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "license_status_deployment_type" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "deployment_type_code" character varying(64), "license_code" character varying, "project_scan_status_type_code" character varying(64), CONSTRAINT "PK_86c06369e5a7f77b43dfc3eeb93" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "UQ_f82f810289766bb51218c1654a5" UNIQUE ("code")`);
    await queryRunner.query(
      `ALTER TABLE "license_status_deployment_type" ADD CONSTRAINT "FK_ddb0ccc318b7ba2b36148814e82" FOREIGN KEY ("deployment_type_code") REFERENCES "deployment_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_status_deployment_type" ADD CONSTRAINT "FK_ab2ce6855562962ab0dcf2c9093" FOREIGN KEY ("license_code") REFERENCES "license"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "license_status_deployment_type" ADD CONSTRAINT "FK_9c54c2f2f322a1f91d581248031" FOREIGN KEY ("project_scan_status_type_code") REFERENCES "project_scan_status_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
