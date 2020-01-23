import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ModelBase } from './ModelBase';
import { Project } from './Project';

@Entity()
export class ProjectNote extends ModelBase {
  @ApiModelProperty()
  @Column({ type: 'text', default: '', nullable: false })
  note: string;

  @ApiModelProperty()
  @Column({ type: 'text', default: '', nullable: true })
  notePayload: string;

  @ApiModelProperty({ type: type => Project })
  @ManyToOne(type => Project, project => project.projectNotes, {
    eager: true,
    onDelete: 'CASCADE',
  })
  project: Project;

  @ApiModelProperty()
  @Column({ name: 'user_id', nullable: false })
  userId: string;
}
