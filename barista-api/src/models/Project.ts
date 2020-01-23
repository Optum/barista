import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BomLicenseException } from './BomLicenseException';
import { BomManualLicense } from './BomManualLicense';
import { BomSecurityException } from './BomSecurityException';
import { DeploymentType } from './DeploymentType';
import { ModelBase } from './ModelBase';
import { OutputFormatType } from './OutputFormatType';
import { PackageManager } from './PackageManager';
import { ProjectDevelopmentType } from './ProjectDevelopmentType';
import { ProjectNote } from './ProjectNote';
import { ProjectStatusType } from './ProjectStatusType';
import { Scan } from './Scan';

@Entity()
export class Project extends ModelBase {
  @ApiModelProperty()
  @Column({ type: 'text', default: '' })
  askID: string;

  @ApiModelProperty()
  @Column({ type: 'text', default: '' })
  configuration: string;

  @ApiModelProperty()
  @Column({ type: 'text', default: '', nullable: true })
  currentVersion: string;

  /**
   * A custom name for the package manager file, if any.
   */
  @ApiModelProperty()
  @Column({ name: 'custom_package_manager_filename', nullable: true })
  customPackageManagerFilename: string;

  /**
   * This is the location of the corresponding package specification relative to the project's root in source control.
   */
  @ApiModelProperty()
  @Column({ name: 'custom_package_manager_path', nullable: true })
  customPackageManagerPath: string;

  @ApiModelProperty({ type: type => DeploymentType })
  @JoinColumn({
    name: 'deployment_type_code',
    referencedColumnName: 'code',
  })
  @ManyToOne(type => DeploymentType, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  deploymentType: DeploymentType;

  @ApiModelProperty()
  @Column({ type: 'text', default: '' })
  description: string;

  @ApiModelProperty({ type: type => ProjectDevelopmentType })
  @JoinColumn({
    name: 'development_type_code',
    referencedColumnName: 'code',
  })
  @ManyToOne(type => ProjectDevelopmentType, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  developmentType: ProjectDevelopmentType;

  @ApiModelProperty()
  @Column({ name: 'git_url', nullable: true })
  gitUrl: string;

  @ApiModelProperty()
  @Column({ nullable: true, default: false })
  globalLicenseException: boolean;

  @ApiModelProperty()
  @Column({ nullable: true, default: false })
  globalSecurityException: boolean;

  @ApiModelProperty()
  @Column({ type: 'jsonb', nullable: true })
  importMetaData: any;

  @ApiModelProperty({ type: type => BomLicenseException, isArray: true })
  @OneToMany(type => BomLicenseException, item => item.project)
  licenseExceptions: BomLicenseException[];

  @ApiModelProperty({ type: type => BomManualLicense, isArray: true })
  @OneToMany(type => BomManualLicense, item => item.project)
  manualLicenses: BomManualLicense[];
  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @Column({ type: 'text', default: '', nullable: true })
  outputEmail: string;

  @ApiModelProperty({ type: type => OutputFormatType })
  @JoinColumn({
    name: 'output_format_code',
    referencedColumnName: 'code',
  })
  @ManyToOne(type => OutputFormatType, {
    eager: true,

    onDelete: 'SET NULL',
    nullable: true,
  })
  outputFormat: OutputFormatType;

  @ApiModelProperty()
  @Column({ type: 'text', default: '', nullable: true })
  owner: string;

  @ApiModelProperty({ type: type => PackageManager })
  @JoinColumn({
    name: 'package_manager_code',
    referencedColumnName: 'code',
  })
  @ManyToOne(type => PackageManager, {
    eager: true,

    onDelete: 'SET NULL',
    nullable: true,
  })
  packageManager: PackageManager;

  @ApiModelProperty()
  @Column({ type: 'text', default: '', nullable: true })
  pathToUploadFileForScanning: string;

  @ApiModelProperty({ type: type => ProjectNote, isArray: true })
  @OneToMany(type => ProjectNote, projectNote => projectNote.project)
  projectNotes: ProjectNote[];

  @ApiModelProperty({ type: type => ProjectStatusType })
  @JoinColumn({
    name: 'project_status_code',
    referencedColumnName: 'code',
  })
  @ManyToOne(type => ProjectStatusType, {
    eager: true,

    onDelete: 'SET NULL',
    nullable: true,
  })
  projectStatus: ProjectStatusType;

  @ApiModelProperty({ type: type => Scan, isArray: true })
  @OneToMany(type => Scan, scan => scan.project)
  scans: Scan[];

  @ApiModelProperty({ type: type => BomSecurityException, isArray: true })
  @OneToMany(type => BomSecurityException, item => item.project)
  securityExceptions: BomSecurityException[];

  @ApiModelProperty()
  @Column({ type: 'text', default: '', nullable: false, width: 64 })
  @Index('project_user_idx1')
  userId: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  wasImported: boolean;
}
