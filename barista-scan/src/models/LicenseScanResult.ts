import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { LicenseScanResultItem } from './LicenseScanResultItem';
import { ModelBase } from './ModelBase';
import { Scan } from './Scan';

@Entity()
export class LicenseScanResult extends ModelBase {
  @ApiModelProperty()
  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date;

  @Column({ name: 'json_results', type: 'jsonb', nullable: true })
  jsonResults: any;

  @OneToMany(type => LicenseScanResultItem, resultItem => resultItem.licenseScan)
  licenseScanResultItems: LicenseScanResultItem[];

  @ApiModelProperty({ type: type => Scan })
  @ManyToOne(type => Scan, result => result.licenseScanResults, {
    onDelete: 'CASCADE',
  })
  scan: Scan;

  @ApiModelProperty()
  @Column({ name: 'scan_tool' })
  scanTool: string;

  @ApiModelProperty()
  @Column({ name: 'started_at', nullable: true })
  startedAt: Date;
}
