import { getConnection, MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { PackageManager } from '../../models';

export class Python3PackageManager1573598697833 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repo: Repository<PackageManager> = this.connection.getRepository(PackageManager);

    await repo.delete({ code: 'python3' });
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const packageManager = {
      description: 'Python3 + Pip',
      code: 'python3-pip',
      tag: this.constructor.name,
    };
    await this.connection.getRepository(PackageManager).save(packageManager);
  }
}
