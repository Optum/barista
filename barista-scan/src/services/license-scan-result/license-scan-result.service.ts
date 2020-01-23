import { LicenseScanResult, LicenseScanResultItem, Obligation, Scan } from '@app/models';
import { ProjectDistinctLicenseDto } from '@app/models/DTOs';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LicenseScanResultService extends AppServiceBase<LicenseScanResult> {
  constructor(@InjectRepository(LicenseScanResult) repo) {
    super(repo);
  }

  /**
   * Gets distinct licenses from a LicenseScanResult
   */
  async distinctLicenses(licenseScanResult: LicenseScanResult): Promise<ProjectDistinctLicenseDto[]> {
    return (await LicenseScanResultItem.createQueryBuilder('ri')
      .innerJoin('ri.license', 'license')
      .innerJoin('ri.licenseScan', 'licenseScan')
      .addGroupBy('license.id')
      .addOrderBy('count(*)', 'DESC')
      .where('licenseScan.id = :id', { id: licenseScanResult.id })
      .select('license.name as name')
      .addSelect('count(*) as count')
      .getRawMany()).map(row => ({
      count: +row.count,
      license: {
        name: row.name,
      },
    }));
  }

  /**
   * Gets distinct obligations from a LicenseScanResult
   */
  async distinctObligations(licenseScanResult: LicenseScanResult): Promise<Obligation[]> {
    const obligationIdQuery = LicenseScanResultItem.createQueryBuilder('resultItem')
      .leftJoin('resultItem.licenseScan', 'licenseScan')
      .leftJoin('resultItem.license', 'license')
      .leftJoinAndSelect('license.obligations', 'obligations')
      .where('licenseScan.id = :id', { id: licenseScanResult.id })
      .select('DISTINCT obligations.id', 'obligationIds');

    return await Obligation.createQueryBuilder('obligation')
      .where('obligation.id IN (' + obligationIdQuery.getQuery() + ')')
      .setParameters(obligationIdQuery.getParameters())
      .getMany();
  }

  async insertResult(partial: Partial<LicenseScanResult>, scan: Scan) {
    const result = await this.db.create(partial);
    await result.save();
    result.scan = scan;
    await result.save();

    return result;
  }
}
