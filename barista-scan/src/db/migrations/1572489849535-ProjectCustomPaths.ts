import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { Project } from '../../models';

export class ProjectCustomPaths1572489849535 implements MigrationInterface {
  connection = getConnection('default');

  public async down(queryRunner: QueryRunner): Promise<any> {
    const projectRepo = this.connection.getRepository(Project);

    await queryRunner.renameColumn(
      projectRepo.metadata.tableName,
      'custom_package_manager_filename',
      'dotnet_sln_file',
    );

    await queryRunner.renameColumn(projectRepo.metadata.tableName, 'custom_package_manager_path', 'package_root');
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const projectRepo = this.connection.getRepository(Project);

    await queryRunner.renameColumn(
      projectRepo.metadata.tableName,
      'dotnet_sln_file',
      'custom_package_manager_filename',
    );
    await queryRunner.renameColumn(projectRepo.metadata.tableName, 'package_root', 'custom_package_manager_path');
  }
}
