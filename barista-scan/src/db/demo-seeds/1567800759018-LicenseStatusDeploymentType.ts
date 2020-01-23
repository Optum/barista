import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { License, LicenseStatusDeploymentType } from '../../models';
import { LicenseStatusDeploymentTypeSeed } from './LicenseStatusDeploymentType.seed';

export class LicenseStatusDeploymentType1567800759018 implements MigrationInterface {
  connection = getConnection('demo-seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(LicenseStatusDeploymentType).delete({});
    await this.connection.getRepository(License).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(License).save({ code: 'MIT', name: 'MIT License' });
    await this.connection.getRepository(LicenseStatusDeploymentType).save(LicenseStatusDeploymentTypeSeed);
  }
}
