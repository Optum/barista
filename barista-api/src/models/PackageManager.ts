import { Entity } from 'typeorm';
import { OptionValueModelBase } from './OptionValueModelBase';

export enum PackageManagerEnum {
  MAVEN = 'maven',
  NONE = 'none',
  NPM = 'npm',
  NUGET = 'nuget',
  PYTHON3_PIP = 'python3-pip',
  PYTHON2_7_PIP = 'python2_7-pip',
}

@Entity()
export class PackageManager extends OptionValueModelBase {}
