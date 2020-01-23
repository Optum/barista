import { ApiModelProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { ModelBase } from './ModelBase';

export class BomItemBase extends ModelBase {
  @ApiModelProperty()
  @Column({ type: 'text', default: '' })
  notes: string;

  @ApiModelProperty()
  @Column({ name: 'user_id' })
  userId: string;
}
