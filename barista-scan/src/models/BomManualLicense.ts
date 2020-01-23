import { ProjectScanStatusType } from '@app/models/ProjectScanStatusType';
import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BomItemBase } from './BomItemBase';
import { License } from './License';
import { Project } from './Project';

@Entity()
export class BomManualLicense extends BomItemBase {
  /**
   * Is this the default license for the project?
   */
  @ApiModelProperty()
  @Column({ name: 'is_default', nullable: false, default: false })
  isDefault: boolean;
  /**
   * A convenience association to the license since there is no relationship with a LicenseScanResultItem
   */
  @ManyToOne(type => License, {
    eager: true,
    nullable: false,
    onDelete: 'NO ACTION',
  })
  @ApiModelProperty({ type: type => License })
  license: License;

  /**
   * The name of the product associated with the license
   */
  @ApiModelProperty()
  @Column({ name: 'product_name', nullable: false })
  productName: string;

  /**
   * The canonical version of the product associated with the license
   */
  @ApiModelProperty()
  @Column({ name: 'product_version', nullable: false })
  productVersion: string;

  @ApiModelProperty({ type: type => Project })
  @ManyToOne(type => Project, project => project.manualLicenses, {
    eager: true,

    onDelete: 'CASCADE',
  })
  project: Project;

  /**
   * The ProjectScanStatusType (Not tracked in the DB, for API responses only)
   */
  @ApiModelProperty({ type: type => ProjectScanStatusType })
  projectScanStatus: ProjectScanStatusType;

  /**
   * The referenceUrl for more information
   */
  @ApiModelProperty()
  @Column({ name: 'reference_url', nullable: true })
  referenceUrl: string;
}
