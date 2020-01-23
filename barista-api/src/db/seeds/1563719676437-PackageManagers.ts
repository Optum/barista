import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { PackageManager } from '../../models';
import { PackageManagerSeed } from './PackageManager.seed';

export class PackageManagers1563719676437 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(PackageManager).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(PackageManager).save(PackageManagerSeed);
  }
}
