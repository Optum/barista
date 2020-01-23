import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ModelBase } from './ModelBase';
import { Scan } from './Scan';
import { SecurityScanResultItem } from './SecurityScanResultItem';

@Entity()
export class SecurityScanResult extends ModelBase {
  @ApiModelProperty()
  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date;

  @ApiModelProperty()
  @Column({ name: 'html_results', type: 'text', nullable: true })
  htmlResults: string;

  @ApiModelProperty()
  @Column({ name: 'json_results', type: 'jsonb', nullable: true })
  jsonResults: any;

  @ApiModelProperty({ type: type => Scan })
  @ManyToOne(type => Scan, scan => scan.securityScanResults, {
    onDelete: 'CASCADE',
  })
  scan: Scan;
  @ApiModelProperty()
  @Column({ name: 'scan_tool' })
  scanTool: string;

  @OneToMany(type => SecurityScanResultItem, resultItem => resultItem.securityScan)
  securityScanResultItems: SecurityScanResultItem[];

  @ApiModelProperty()
  @Column({ name: 'started_at', nullable: true })
  startedAt: Date;
}
