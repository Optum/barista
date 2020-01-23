// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveBillOfMaterials1568161216018 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP CONSTRAINT "FK_b2fd00f4cad38fd50c850ec3027"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" DROP CONSTRAINT "FK_ccb1aa482b82d4a6fc8cc8a1290"`);
    await queryRunner.query(`ALTER TABLE "bom_manual_license" DROP CONSTRAINT "FK_efcbc10954a1e46a0dbc7dbc2b6"`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" RENAME COLUMN "projectId" TO "billOfMaterialsId"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" RENAME COLUMN "projectId" TO "billOfMaterialsId"`);
    await queryRunner.query(`ALTER TABLE "bom_manual_license" RENAME COLUMN "projectId" TO "billOfMaterialsId"`);
    await queryRunner.query(
      `ALTER TABLE "bom_license_exception" ADD CONSTRAINT "FK_9d18dfc6aeb1aff9bb0df49b537" FOREIGN KEY ("billOfMaterialsId") REFERENCES "bill_of_materials"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_security_exception" ADD CONSTRAINT "FK_67c83cf33f2709de403df49f89c" FOREIGN KEY ("billOfMaterialsId") REFERENCES "bill_of_materials"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_manual_license" ADD CONSTRAINT "FK_3f2421a7019cbdb4aad56444a32" FOREIGN KEY ("billOfMaterialsId") REFERENCES "bill_of_materials"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "bom_manual_license" DROP CONSTRAINT "FK_3f2421a7019cbdb4aad56444a32"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" DROP CONSTRAINT "FK_67c83cf33f2709de403df49f89c"`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" DROP CONSTRAINT "FK_9d18dfc6aeb1aff9bb0df49b537"`);
    await queryRunner.query(`ALTER TABLE "bom_manual_license" RENAME COLUMN "billOfMaterialsId" TO "projectId"`);
    await queryRunner.query(`ALTER TABLE "bom_security_exception" RENAME COLUMN "billOfMaterialsId" TO "projectId"`);
    await queryRunner.query(`ALTER TABLE "bom_license_exception" RENAME COLUMN "billOfMaterialsId" TO "projectId"`);
    await queryRunner.query(
      `ALTER TABLE "bom_manual_license" ADD CONSTRAINT "FK_efcbc10954a1e46a0dbc7dbc2b6" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_security_exception" ADD CONSTRAINT "FK_ccb1aa482b82d4a6fc8cc8a1290" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_license_exception" ADD CONSTRAINT "FK_b2fd00f4cad38fd50c850ec3027" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
