import { getConnection, MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { PackageManager } from '../../models';

export class Python271575943176180 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repo: Repository<PackageManager> = this.connection.getRepository(PackageManager);

    await repo.delete({ code: 'python2_7-pip' });

    const python3 = await repo.findOne('python3-pip');

    delete python3.metaData;
    python3.description = 'Python3 + Pip';
    await repo.save(python3);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const repo = this.connection.getRepository(PackageManager);
    const packageManager = {
      description: 'Python v2.7.17 + Pip',
      code: 'python2_7-pip',
      metaData: { pythonVersion: '2.7.17' } as any,
      tag: this.constructor.name,
    };
    await repo.save(packageManager);

    const python3 = await repo.findOne('python3-pip');

    python3.metaData = { pythonVersion: '3.7.5' } as any;
    python3.description = 'Python v3.7.5 + Pip';
    await repo.save(python3);
  }
}
