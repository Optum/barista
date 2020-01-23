import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { SecurityScanResultItemStatusType } from '../..//models';
import { SecurityScanResultItemStatusTypeSeed } from './SecurityScanResultItemStatusType.seed';

export class SecurityScanResultItemStatusType1566952206360 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(SecurityScanResultItemStatusType).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(SecurityScanResultItemStatusType).save(SecurityScanResultItemStatusTypeSeed);
  }
}
