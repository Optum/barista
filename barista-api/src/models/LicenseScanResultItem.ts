import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { License } from './License';
import { LicenseScanResult } from './LicenseScanResult';
import { ProjectScanStatusType } from './ProjectScanStatusType';
import { ResultItemBase } from './ResultItemBase';

@Entity()
export class LicenseScanResultItem extends ResultItemBase {
  /**
   * A boolean to indicate if the license result was matched by "fuzzy" logic
   * in case it needs to be reviewed by a human.
   */
  @ApiModelProperty()
  @Column({ name: 'fuzzy_matched', nullable: false, default: false })
  fuzzyMatched: boolean;
  /**
   * The detected license
   */
  @ApiModelProperty({ type: type => License })
  @ManyToOne(type => License, license => license)
  license: License;
  /**
   * The associated LicenseScanResult
   */
  @ApiModelProperty({ type: type => LicenseScanResult })
  @ManyToOne(type => LicenseScanResult, result => result.licenseScanResultItems, { onDelete: 'CASCADE' })
  licenseScan: LicenseScanResult;

  /**
   * The ProjectScanStatusType at the time of detection.
   */
  @ApiModelProperty({ type: type => ProjectScanStatusType })
  @ManyToOne(type => ProjectScanStatusType, { eager: true })
  @JoinColumn({ name: 'project_scan_status_type_code', referencedColumnName: 'code' })
  projectScanStatus: ProjectScanStatusType;

  @ApiModelProperty()
  @Column({ nullable: true })
  publisherEmail: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  publisherName: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  publisherUrl: string;
}
