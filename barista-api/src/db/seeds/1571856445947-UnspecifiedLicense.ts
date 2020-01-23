import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { License } from '../../models';

export class UnspecifiedLicense1571856445947 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(License).delete({ tag: this.constructor.name });
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const seed = {
      code: 'UNKNOWN',
      name: 'Unknown License',
      isCpdx: false,
      tag: this.constructor.name,
    };

    const licenseRepo = await this.connection.getRepository(License);

    const license = await licenseRepo.findOne({
      where: { code: seed.code },
    });

    // If a license exists in the database update it
    if (!license) {
      await licenseRepo.save(seed);
    }
  }
}
