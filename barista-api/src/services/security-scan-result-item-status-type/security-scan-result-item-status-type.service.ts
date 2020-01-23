import { SecurityScanResultItemStatusType } from '@app/models/SecurityScanResultItemStatusType';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SecurityScanResultItemStatusTypeService extends AppServiceBase<SecurityScanResultItemStatusType> {
  constructor(@InjectRepository(SecurityScanResultItemStatusType) repo) {
    super(repo);
  }

  static async Critical() {
    return await SecurityScanResultItemStatusType.findOne('critical');
  }

  static async High() {
    return await SecurityScanResultItemStatusType.findOne('high');
  }

  static async Low() {
    return await SecurityScanResultItemStatusType.findOne('low');
  }

  static async Medium() {
    return await SecurityScanResultItemStatusType.findOne('medium');
  }

  static async Unknown() {
    return await SecurityScanResultItemStatusType.findOne('unknown');
  }
}
