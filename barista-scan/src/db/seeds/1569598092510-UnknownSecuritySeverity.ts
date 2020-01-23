import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { SecurityScanResultItemStatusType } from '../../models';

export class UnknownSecuritySeverity1569598092510 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(SecurityScanResultItemStatusType).delete({ code: 'unknown' });
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(SecurityScanResultItemStatusType).save({
      code: 'unknown',
      description: 'Unknown',
      sortOrder: 5,
    });
  }
}
