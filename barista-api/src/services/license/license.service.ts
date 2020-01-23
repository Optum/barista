import { LicenseObligation, Obligation, SystemConfiguration } from '@app/models';
import { License } from '@app/models/License';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { SystemConfigurationService } from '@app/services/system-configuration/system-configuration.service';
import PaginateArrayResult from '@app/shared/util/paginate-array-result';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import * as _ from 'lodash';
import * as pit from 'p-iteration';
import spdxCorrect = require('spdx-correct');
import { compareTwoStrings } from 'string-similarity';
import { Repository } from 'typeorm';
import * as spdx from './spdx-licenses.json';

@Injectable()
export class LicenseService extends AppServiceBase<License> {
  constructor(@InjectRepository(License) repo) {
    super(repo);
  }

  logger = new Logger('LicenseService');

  static async fuzzyMatchLicense(text: string, repo: Repository<License>) {
    const licenses = await repo.find({});

    return this.fuzzyMatchLicensePreload(text, licenses);
  }

  static async fuzzyMatchLicensePreload(text: string, licenses: License[]) {
    const result = [];

    await pit.forEach(licenses, async license => {
      const score = compareTwoStrings(text, license.name);

      if (score > 0.2) {
        // If the string is more than a 20% match
        result.push({ score, license });
      }
    });

    if (!_.isEmpty(result)) {
      return _.sortBy(result, 'score').reverse()[0].license;
    } else {
      return _.find(licenses, { code: 'UNKNOWN' });
    }
  }

  /**
   * Deduces an spdx identifier from a license string.
   * @param expression A string that would correspond to an spdx license.
   */
  static getSpdxId(expression: string) {
    return spdxCorrect(expression);
  }

  static async refreshLicenses(
    licenseRepo: Repository<License>,
    configRepo: Repository<SystemConfiguration>,
    tag?: string,
  ) {
    const logger = new Logger('LicenseService');
    const config = await SystemConfigurationService.defaultConfiguration(configRepo);

    if (config.spdxLicenseListVersion !== spdx.licenseListVersion) {
      // For each spdx License
      await pit.forEach(spdx.licenses, async (rawLicense: any) => {
        let license = await licenseRepo.findOne({
          where: { code: rawLicense.licenseId },
        });

        // If a license exists in the database update it
        if (license) {
          logger.debug(`License found UPDATING: ${JSON.stringify(license)}`);

          license.referenceUrl = rawLicense.detailsUrl;
        } else {
          // If a license does not exist in the database, insert it
          license = licenseRepo.create();
          license.referenceUrl = rawLicense.detailsUrl;
          license.name = rawLicense.name;
          license.code = rawLicense.licenseId;
          license.isCpdx = true;

          if (tag) {
            license.tag = tag;
          }

          if (rawLicense.seeAlso && rawLicense.seeAlso.length > 0) {
            license.homepageUrl = rawLicense.seeAlso[0];
          }

          logger.debug(`License NOT found INSERTING: ${JSON.stringify(license)}`);
        }

        await licenseRepo.save(license);
      });

      config.spdxLicenseListVersion = spdx.licenseListVersion;
      await configRepo.save(config);

      logger.debug(
        `SystemConfiguration.defaultConfiguration().refresh() FINISHED! spdxLicenseListVersion: ${spdx.licenseListVersion}`,
      );
    } else {
      // tslint:disable:max-line-length
      logger.debug(
        `SystemConfiguration.defaultConfiguration().spdxLicenseListVersion: ${config.spdxLicenseListVersion} matches spdx.licenseListVersion: ${spdx.licenseListVersion}`,
      );
      // tslint:enable:max-line-length
    }
  }

  async associatedObligations(
    licenseCode: string,
    page: number,
    perPage: number,
  ): Promise<GetManyDefaultResponse<any>> {
    const query = Obligation.createQueryBuilder('obligation')
      .innerJoin('license_obligations_obligation', 'lo', 'lo.obligationCode = obligation.code')
      .where('lo.licenseCode = :licenseCode', { licenseCode })
      .orderBy('obligation.name', 'ASC');

    return PaginateArrayResult<any>(query, page, perPage);
  }

  /**
   * Finds all licenses by a given filter and associates to them the given obligation.
   * @param obligationCode
   * @param licenseFilter
   */
  async associateObligationToLicensesByFilter(obligationCode: string, licenseFilter: string): Promise<number> {
    const licenses = _.isEmpty(licenseFilter)
      ? await this.db.createQueryBuilder().getMany()
      : await this.db
          .createQueryBuilder()
          .where('lower(name) like :filter or lower(code) like :filter', {
            filter: '%' + licenseFilter.toLocaleLowerCase() + '%',
          })
          .getMany();
    let cnt = 0;
    await pit.forEach(licenses, async license => {
      if (await this.upsertLicenseObligationAssociation({ licenseCode: license.code, obligationCode })) {
        cnt++;
      }
    });

    return cnt;
  }

  /**
   * A convenience method to perform a best effort match against the license database.
   * @param licenseName
   */
  async bestEffortMatch(licenseName: string) {
    const matchDetails = {
      spdxMatch: false,
      fuzzyMatch: false,
    };

    let license = null;
    // Get license identifier if this is an spdx license
    const licenseCode = LicenseService.getSpdxId(licenseName);

    // TODO: Possibly add some more defensive logic here for the case where the getSpdxId and license db are out of sync
    if (licenseCode) {
      license = await this.db.findOne({ where: { code: licenseCode } });
      if (license) {
        matchDetails.spdxMatch = true;
      }
    } else {
      // If we couldn't look up the license, let's try a fuzzy match
      license = await this.fuzzyMatchLicense(licenseName);
      if (license) {
        matchDetails.fuzzyMatch = true;
      }
    }

    return { license, matchDetails };
  }

  /**
   * Delete an association between License and Obligation
   * @param association
   */
  async deleteLicenseObligationAssociation(association: LicenseObligation): Promise<boolean> {
    const result = await this.db
      .createQueryBuilder()
      .delete()
      .from('license_obligations_obligation')
      .where('licenseCode = :licenseCode and obligationCode = :obligationCode', {
        licenseCode: association.licenseCode,
        obligationCode: association.obligationCode,
      })
      .execute();
    return !!result.affected;
  }

  /**
   * Deletes a given obligation from all licenses filtered by a filter
   * @param obligationCode
   * @param licenseFilter
   */
  async deleteObligationFromLicensesByFilter(obligationCode: string, licenseFilter: string): Promise<number> {
    const licenses = _.isEmpty(licenseFilter)
      ? await this.db.createQueryBuilder().getMany()
      : await this.db
          .createQueryBuilder()
          .where('lower(name) like :filter or lower(code) like :filter', {
            filter: '%' + licenseFilter.toLocaleLowerCase() + '%',
          })
          .getMany();
    let cnt = 0;
    for (const license of licenses) {
      if (await this.deleteLicenseObligationAssociation({ licenseCode: license.code, obligationCode })) {
        cnt++;
      }
    }

    return cnt;
  }

  /**
   * Uses fuzzy logic to match a string with an existing license in the database.
   * @param text The string to compare with the license names in the database.
   */
  async fuzzyMatchLicense(text: string) {
    return LicenseService.fuzzyMatchLicense(text, this.db);
  }

  /***
   * Refreshes licenses in the database.
   * Run on app startup.
   * If a license exists in the database, it updates it.
   * If it does not exist, it creates it.
   */
  async refreshLicenses() {
    await LicenseService.refreshLicenses(this.db, SystemConfiguration.getRepository());
  }

  /**
   * Searches for licenses
   * @param filter
   * @param page
   * @param pageSize
   */
  async search(filter: string, page: number, pageSize: number): Promise<GetManyDefaultResponse<License>> {
    const query = await this.db
      .createQueryBuilder('license')
      .where('lower(name) like :filter or lower(code) like :filter', {
        filter: '%' + filter.toLocaleLowerCase() + '%',
      });

    return await PaginateArrayResult(query, +page, +pageSize);
  }

  async upsertLicense(licenseKey: string, rawLicense: Partial<License>): Promise<License> {
    return new Promise<License>(async resolve => {
      // Check if there is an existing license using the key
      let license = await this.db.findOne({
        where: { code: licenseKey },
      });

      if (license) {
        // If exists return it
        resolve(license);
      } else {
        // If not, create one
        rawLicense.unknownLicense = true;
        license = await this.db.create(rawLicense).save();
        license = await this.db.findOne(license.id);
        resolve(license);
      }
    });
  }

  async upsertLicenseObligationAssociation(association: LicenseObligation): Promise<boolean> {
    const response = await License.createQueryBuilder('license')
      .innerJoin('license_obligations_obligation', 'lo', 'lo.licenseCode = license.code')
      .where('lo.obligationCode = :obligationCode', { obligationCode: association.obligationCode })
      .andWhere('lo.licenseCode = :licenseCode', { licenseCode: association.licenseCode })
      .getCount();
    if (!response) {
      await this.db
        .createQueryBuilder('insert')
        .insert()
        .into('license_obligations_obligation')
        .values([
          {
            licenseCode: association.licenseCode,
            obligationCode: association.obligationCode,
          },
        ])
        .execute();
      return true;
    }

    return false;
  }
}
