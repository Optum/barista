import { ApiModelProperty } from '@nestjs/swagger';
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class ModelBase extends BaseEntity {
  @ApiModelProperty()
  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column({ type: 'jsonb', nullable: true })
  metaData: any;

  @ApiModelProperty()
  @Column({ nullable: true })
  tag: string;

  @ApiModelProperty()
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
