import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { ProjectScanStatusType } from '../../models';

export class ProjectScanStatusTypeUnknown1569930443310 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(ProjectScanStatusType).delete('unknown');

    const green = await this.connection.getRepository(ProjectScanStatusType).findOne('green');
    green.isDefault = true;
    green.sortOrder = 0;

    const yellow = await this.connection.getRepository(ProjectScanStatusType).findOne('yellow');
    yellow.isDefault = false;
    yellow.sortOrder = 1;

    const red = await this.connection.getRepository(ProjectScanStatusType).findOne('red');
    red.isDefault = false;
    red.sortOrder = 2;

    await this.connection.getRepository(ProjectScanStatusType).save([green, yellow, red]);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const unknown = {
      code: 'unknown',
      description: 'Unknown',
      isDefault: true,
      sortOrder: 0,
    } as ProjectScanStatusType;

    const green = await this.connection.getRepository(ProjectScanStatusType).findOne('green');
    green.isDefault = false;
    green.sortOrder = 1;

    const yellow = await this.connection.getRepository(ProjectScanStatusType).findOne('yellow');
    yellow.isDefault = false;
    yellow.sortOrder = 2;

    const red = await this.connection.getRepository(ProjectScanStatusType).findOne('red');
    red.isDefault = false;
    red.sortOrder = 3;

    await this.connection.getRepository(ProjectScanStatusType).save([unknown, green, yellow, red]);
  }
}
