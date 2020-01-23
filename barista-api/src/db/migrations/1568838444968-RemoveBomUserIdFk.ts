// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveBomUserIdFk1568838444968 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "bom_license_exception" ADD CONSTRAINT "FK_133a2ae9bfb55d46a03d079073c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_security_exception" ADD CONSTRAINT "FK_e429afe5ea2e0227f27f7980878" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_manual_license" ADD CONSTRAINT "FK_97156ea5aa5f5e2cb546b129192" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_manual_license" DROP CONSTRAINT "FK_97156ea5aa5f5e2cb546b129192"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" DROP CONSTRAINT "FK_e429afe5ea2e0227f27f7980878"`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP CONSTRAINT "FK_133a2ae9bfb55d46a03d079073c"`);
  }
}
