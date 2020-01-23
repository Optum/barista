import { ApiModelProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { ModelBase } from './ModelBase';

export class ResultItemBase extends ModelBase {
  /**
   * A human readable string used to describe the item that can be displayed to the user
   */
  @ApiModelProperty()
  @Column({ name: 'description', nullable: true })
  description: string;

  /**
   * A human readable string used to identify the item that can be displayed to the user
   */
  @ApiModelProperty()
  @Column({ name: 'displayIdentifier' })
  displayIdentifier: string;
  /**
   * The item type, file/library/license file/other reserved for future use
   */
  @ApiModelProperty()
  @Column({ name: 'item_type', nullable: true })
  itemType: string;

  /**
   * The path of the item if applicable
   */
  @ApiModelProperty()
  @Column({ name: 'path' })
  path: string;

  /**
   * The raw result of the item as reported by the underlying tool
   */
  @Column({ name: 'raw_results', type: 'jsonb', nullable: true })
  rawResults: string;
}
