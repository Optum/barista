import * as pit from 'p-iteration';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { License, Obligation } from '../../models';
import { ObligationLicenseRelationships, ObligationSeed } from './Obligation.seed';

export class Obligations1562023852328 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(Obligation).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const obligationRepo = this.connection.getRepository(Obligation);
    await obligationRepo.save(ObligationSeed);

    const licenseRepo = this.connection.getRepository(License);

    // TODO: Make sure that this is joining correctly...Join file taken from here:
    // https://github.com/Barista/barista/blob/master/doc/LicenseAndObligationsLoadInst/licenseobligationsid.csv
    await pit.forEach(ObligationLicenseRelationships, async (relation: any) => {
      const obligation = await obligationRepo.findOne(relation.obligation_id);
      const license = await licenseRepo.findOne(relation.license_id);

      if (license) {
        if (!license.obligations) {
          license.obligations = [];
        }

        license.obligations.push(obligation);

        await this.connection.getRepository(License).save(license);
      }
    });
  }
}
