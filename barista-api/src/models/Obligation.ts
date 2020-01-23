import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { License } from './License';
import { ModelBase } from './ModelBase';

@Entity()
export class Obligation extends ModelBase {
  @ApiModelProperty()
  @Column({ unique: true })
  code: string;

  @ApiModelProperty()
  @Column()
  desc: string;

  @ApiModelProperty({ type: type => License, isArray: true })
  @ManyToMany(type => License, license => license.obligations, {
    nullable: true,
  })
  @JoinTable({
    name: 'license_obligations_obligation',
    joinColumn: {
      name: 'obligationCode',
      referencedColumnName: 'code',
    },
    inverseJoinColumn: {
      name: 'licenseCode',
      referencedColumnName: 'code',
    },
  })
  licenses: License[];

  @ApiModelProperty()
  @Column()
  name: string;
}
