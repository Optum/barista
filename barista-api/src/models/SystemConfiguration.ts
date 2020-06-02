import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { OptionValueModelBase } from './OptionValueModelBase';

@Entity()
export class SystemConfiguration extends OptionValueModelBase {
  @ApiProperty()
  @Column({ name: 'about_menu', type: 'jsonb', nullable: true })
  aboutMenu: any;

  /**
   * Markdown formatted text that will appear in the about page.
   */
  @ApiProperty()
  @Column({ name: 'about_page_content', nullable: true, type: 'text' })
  aboutPageContent: string;

  @ApiProperty()
  @Column({ name: 'ask_id_display_name', nullable: true, default: 'Project ID' })
  askIdDisplayName: string;

  @ApiProperty()
  @Column({ name: 'contact_menu', type: 'jsonb', nullable: true })
  contactMenu: any;

  @ApiProperty()
  @Column({ name: 'email_from_address', nullable: true })
  emailFromAddress: string;

  @ApiProperty()
  @Column({ name: 'ghcom_password_env_var', nullable: true })
  githubComPasswordEnvVar: string;

  @ApiProperty()
  @Column({ name: 'ghcom_username_env_var', nullable: true })
  githubComUsernameEnvVar: string;

  @ApiProperty()
  @Column({ name: 'ghe_password_env_var', nullable: true })
  githubEnterprisePasswordEnvVar: string;

  @ApiProperty()
  @Column({ name: 'ghe_url_env_var', nullable: true })
  githubEnterpriseUrlEnvVar: string;

  @ApiProperty()
  @Column({ name: 'ghe_username_env_var', nullable: true })
  githubEnterpriseUsernameEnvVar: string;

  @ApiProperty()
  @Column({ name: 'help_menu', type: 'jsonb', nullable: true })
  helpMenu: any;
  /**
   * The maximum number of threads/processes that will be used when a tool provides a choice for concurrent processing.
   */
  @ApiProperty()
  @Column({ name: 'max_processes', nullable: true, default: 4 })
  maxProcesses: number;
  /**
   * An optional cache directory to use for NPM packages.
   * An `.npm` directory will be created at this path if the directory exists.
   */
  @ApiProperty()
  @Column({ name: 'npm_cache_directory', nullable: true, default: '/usr/src/app/tools' })
  npmCacheDirectory: string;

  /**
   * If present, and if an .npmrc is NOT present in process.env.HOME
   * then this value will be set prior to running the `npm install`
   * command to restore dependencies using: `npm config set registry ${config.npmRegistry}`.
   * If the client cannot reach the registry, install will not fail but the custom registry will not be used.
   */
  @ApiProperty()
  @Column({ name: 'npm_registry', nullable: true, default: 'https://registry.npmjs.org/' })
  npmRegistry: string;

  @ApiProperty()
  @Column({ name: 'production_deploy_url', nullable: true })
  productionDeployUrl: string;

  @ApiProperty()
  @Column({ name: 'spdx_license_list_version', nullable: true })
  spdxLicenseListVersion: string;

  static async defaultConfiguration() {
    return SystemConfiguration.findOne({ where: { isDefault: true } });
  }
}
