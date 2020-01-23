import { Entity } from 'typeorm';
import { OptionValueModelBase } from './OptionValueModelBase';

@Entity()
export class DeploymentType extends OptionValueModelBase {}
