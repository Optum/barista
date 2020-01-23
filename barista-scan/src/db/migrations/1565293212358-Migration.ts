// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1565293212358 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_fb50f2e406b10942dbef83748a6"`);
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_290d3fcaa1d1ad5185793b93bec"`);
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_178d59cf51fe4406fa362c0b2b4"`);
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP CONSTRAINT "UQ_806be749d87a705a20a6e17512c"`);
    await queryRunner.query(`ALTER TABLE "obligation_type" DROP CONSTRAINT "UQ_ac507b3470a2ce56a2b5478aac5"`);
    await queryRunner.query(`ALTER TABLE "output_format_type" DROP CONSTRAINT "UQ_4274f453356a1de900db4cc66a4"`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_fb50f2e406b10942dbef83748a6" FOREIGN KEY ("output_format_code") REFERENCES "output_format_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "project_status_type" DROP CONSTRAINT "UQ_8bcf7f2067cfadd174a2bd22053"`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_178d59cf51fe4406fa362c0b2b4" FOREIGN KEY ("project_status_code") REFERENCES "project_status_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "deployment_type" DROP CONSTRAINT "UQ_60428f364f625bde1e51171168f"`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_290d3fcaa1d1ad5185793b93bec" FOREIGN KEY ("deployment_type_code") REFERENCES "deployment_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_290d3fcaa1d1ad5185793b93bec"`);
    await queryRunner.query(
      `ALTER TABLE "deployment_type" ADD CONSTRAINT "UQ_60428f364f625bde1e51171168f" UNIQUE ("code")`,
    );
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_178d59cf51fe4406fa362c0b2b4"`);
    await queryRunner.query(
      `ALTER TABLE "project_status_type" ADD CONSTRAINT "UQ_8bcf7f2067cfadd174a2bd22053" UNIQUE ("code")`,
    );
    await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_fb50f2e406b10942dbef83748a6"`);
    await queryRunner.query(
      `ALTER TABLE "output_format_type" ADD CONSTRAINT "UQ_4274f453356a1de900db4cc66a4" UNIQUE ("code")`,
    );
    await queryRunner.query(
      `ALTER TABLE "obligation_type" ADD CONSTRAINT "UQ_ac507b3470a2ce56a2b5478aac5" UNIQUE ("code")`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_configuration" ADD CONSTRAINT "UQ_806be749d87a705a20a6e17512c" UNIQUE ("code")`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_178d59cf51fe4406fa362c0b2b4" FOREIGN KEY ("project_status_code") REFERENCES "project_status_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_290d3fcaa1d1ad5185793b93bec" FOREIGN KEY ("deployment_type_code") REFERENCES "deployment_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_fb50f2e406b10942dbef83748a6" FOREIGN KEY ("output_format_code") REFERENCES "output_format_type"("code") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
