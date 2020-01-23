import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Initial1563594307396 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('bill_of_material');
    await queryRunner.dropTable('license');
    await queryRunner.dropTable('license_scan_result');
    await queryRunner.dropTable('license_scan_result_item');
    await queryRunner.dropTable('obligation');
    await queryRunner.dropTable('project');
    await queryRunner.dropTable('scan');
    await queryRunner.dropTable('security_scan_result');
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({ name: 'bill_of_material' }));
    await queryRunner.createTable(new Table({ name: 'license' }));
    await queryRunner.createTable(new Table({ name: 'license_scan_result' }));
    await queryRunner.createTable(new Table({ name: 'license_scan_result_item' }));
    await queryRunner.createTable(new Table({ name: 'obligation' }));
    await queryRunner.createTable(new Table({ name: 'project' }));
    await queryRunner.createTable(new Table({ name: 'scan' }));
    await queryRunner.createTable(new Table({ name: 'security_scan_result' }));
  }
}
