import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { OptionValueModelBase } from './OptionValueModelBase';

@Entity()
export class SystemConfiguration extends OptionValueModelBase {
  @ApiModelProperty()
  @Column({ name: 'about_menu', type: 'jsonb', nullable: true })
  aboutMenu: any;

  /**
   * Markdown formatted text that will appear in the about page.
   */
  @ApiModelProperty()
  @Column({ name: 'about_page_content', nullable: true, type: 'text' })
  aboutPageContent: string;

  @ApiModelProperty()
  @Column({ name: 'ask_id_display_name', nullable: true, default: 'Ask ID' })
  askIdDisplayName: string;

  @ApiModelProperty()
  @Column({ name: 'contact_menu', type: 'jsonb', nullable: true })
  contactMenu: any;

  @ApiModelProperty()
  @Column({ name: 'email_from_address', nullable: true })
  emailFromAddress: string;

  @ApiModelProperty()
  @Column({ name: 'ghcom_password_env_var', nullable: true })
  githubComPasswordEnvVar: string;

  @ApiModelProperty()
  @Column({ name: 'ghcom_username_env_var', nullable: true })
  githubComUsernameEnvVar: string;

  @ApiModelProperty()
  @Column({ name: 'ghe_password_env_var', nullable: true })
  githubEnterprisePasswordEnvVar: string;

  @ApiModelProperty()
  @Column({ name: 'ghe_url_env_var', nullable: true })
  githubEnterpriseUrlEnvVar: string;

  @ApiModelProperty()
  @Column({ name: 'ghe_username_env_var', nullable: true })
  githubEnterpriseUsernameEnvVar: string;

  @ApiModelProperty()
  @Column({ name: 'help_menu', type: 'jsonb', nullable: true })
  helpMenu: any;
  /**
   * The maximum number of threads/processes that will be used when a tool provides a choice for concurrent processing.
   */
  @ApiModelProperty()
  @Column({ name: 'max_processes', nullable: true, default: 4 })
  maxProcesses: number;
  /**
   * An optional cache directory to use for NPM packages.
   * An `.npm` directory will be created at this path if the directory exists.
   */
  @ApiModelProperty()
  @Column({ name: 'npm_cache_directory', nullable: true })
  npmCacheDirectory: string;

  /**
   * If present, and if an .npmrc is NOT present in process.env.HOME
   * then this value will be set prior to running the `npm install`
   * command to restore dependencies using: `npm config set registry ${config.npmRegistry}`.
   * If the client cannot reach the registry, install will not fail but the custom registry will not be used.
   */
  @ApiModelProperty()
  @Column({ name: 'npm_registry', nullable: true })
  npmRegistry: string;

  @ApiModelProperty()
  @Column({ name: 'production_deploy_url', nullable: true })
  productionDeployUrl: string;

  @ApiModelProperty()
  @Column({ name: 'spdx_license_list_version', nullable: true })
  spdxLicenseListVersion: string;

  static async defaultConfiguration() {
    return SystemConfiguration.findOne({ where: { isDefault: true } });
  }
}
