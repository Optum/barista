import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { ModelBase } from './ModelBase';

@Entity()
export class ToolTip extends ModelBase {
  @ApiModelProperty()
  @Column({ type: 'text', nullable: false })
  content: string;

  @ApiModelProperty()
  @Column({ name: 'element_name', type: 'text', nullable: false })
  elementName: string;

  @ApiModelProperty()
  @Column({ type: 'boolean', nullable: false, default: true })
  enabled: boolean;

  @ApiModelProperty()
  @Column({ name: 'page_name', type: 'text', nullable: false })
  pageName: string;
}
