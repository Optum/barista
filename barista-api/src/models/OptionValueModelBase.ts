import { ApiModelProperty } from '@nestjs/swagger';
import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class OptionValueModelBase extends BaseEntity {
  @ApiModelProperty()
  @Column({ nullable: false, unique: true, length: 64, primary: true })
  code: string;

  @ApiModelProperty()
  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @ApiModelProperty()
  @Column({ type: 'text', default: '' })
  description: string;

  @ApiModelProperty()
  @Column({ nullable: false, name: 'is_default', default: false })
  isDefault: boolean;

  @ApiModelProperty()
  @Column({ type: 'jsonb', nullable: true })
  metaData: any;

  @ApiModelProperty()
  @Column({ nullable: true, name: 'sort_order', default: 0 })
  sortOrder: number;

  @ApiModelProperty()
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
