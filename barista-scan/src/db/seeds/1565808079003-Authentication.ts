import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../models';
import { AdminUsersTypeSeed } from './AdminUsers.seed';

export class Authentication1565808079003 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(User).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(User).save(AdminUsersTypeSeed);
  }
}
