import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProjectScanStatusType } from './ProjectScanStatusType';
import { ResultItemBase } from './ResultItemBase';
import { SecurityScanResult } from './SecurityScanResult';
import { SecurityScanResultItemStatusType } from './SecurityScanResultItemStatusType';

@Entity()
export class SecurityScanResultItem extends ResultItemBase {
  /**
   * The CVE ID for the vulnerability
   */
  @ApiModelProperty()
  @Column({ name: 'cve_id', nullable: true })
  cveId: string;

  /**
   * The ProjectScanStatusType at the time of detection.
   */
  @ApiModelProperty({ type: type => ProjectScanStatusType })
  @ManyToOne(type => ProjectScanStatusType)
  @JoinColumn({ name: 'project_scan_status_type_code', referencedColumnName: 'code' })
  projectScanStatus: ProjectScanStatusType;

  /**
   * The referenceUrl for more information
   */
  @ApiModelProperty()
  @Column({ name: 'reference_url', nullable: true })
  referenceUrl: string;

  /**
   * The associated SecurityScanResult
   */
  @ApiModelProperty({ type: type => SecurityScanResult })
  @ManyToOne(type => SecurityScanResult, result => result.securityScanResultItems, {
    onDelete: 'CASCADE',
  })
  securityScan: SecurityScanResult;

  /**
   * The SecurityScanResultItemStatusType of the item HIGH / MEDIUM / LOW
   */
  @ApiModelProperty({ type: type => SecurityScanResultItemStatusType })
  @ManyToOne(type => SecurityScanResultItemStatusType, { eager: true })
  @JoinColumn({ name: 'security_status_code', referencedColumnName: 'code' })
  securityScanResultItemStatus: SecurityScanResultItemStatusType;

  /**
   * The severity of the item as reported by the underlying tool
   */
  @ApiModelProperty()
  @Column({ name: 'severity', nullable: false })
  severity: string;
}
