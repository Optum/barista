import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { LicenseScanResultItem } from './LicenseScanResultItem';
import { ModelBase } from './ModelBase';
import { Obligation } from './Obligation';

@Entity()
export class License extends ModelBase {
  @ApiModelProperty()
  @Column({ unique: true })
  code: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  desc: string;

  @ApiModelProperty()
  @Column({ name: 'homepage_url', nullable: true })
  homepageUrl: string;

  @ApiModelProperty()
  @Column({ name: 'is_cpdx', nullable: false, default: false })
  isCpdx: boolean;

  @ApiModelProperty({ type: type => LicenseScanResultItem, isArray: true })
  @OneToMany(type => LicenseScanResultItem, licenseScanResultItem => licenseScanResultItem.license, { nullable: true })
  @JoinTable()
  licenseScanResultItems: LicenseScanResultItem[];

  // TODO: Add Unique Constraint: @Column({ unique: true })
  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty({ type: type => Obligation, isArray: true })
  @ManyToMany(type => Obligation, obligation => obligation.licenses, {
    nullable: true,
  })
  @JoinTable({
    name: 'license_obligations_obligation',
    joinColumn: {
      name: 'licenseCode',
      referencedColumnName: 'code',
    },
    inverseJoinColumn: {
      name: 'obligationCode',
      referencedColumnName: 'code',
    },
  })
  obligations: Obligation[];

  @ApiModelProperty()
  @Column({ name: 'reference_url', nullable: true })
  referenceUrl: string;

  @ApiModelProperty()
  @Column({ name: 'text_url', nullable: true })
  textUrl: string;

  /**
   * A boolean to indicate if this is a new license found by the system
   * that has not yet been reviewed by a human.
   */
  @ApiModelProperty()
  @Column({ name: 'unknown_license', nullable: false, default: false })
  unknownLicense: boolean;
}
