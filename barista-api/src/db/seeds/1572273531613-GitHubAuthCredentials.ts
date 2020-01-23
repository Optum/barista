import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { SystemConfiguration } from '../../models';

export class GitHubAuthCredentials1572273531613 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    const config = await this.connection.getRepository(SystemConfiguration).findOne({ where: { isDefault: true } });
    config.githubComPasswordEnvVar = null;
    config.githubComUsernameEnvVar = null;
    config.githubEnterprisePasswordEnvVar = null;
    config.githubEnterpriseUrlEnvVar = null;
    config.githubEnterpriseUsernameEnvVar = null;
    await this.connection.getRepository(SystemConfiguration).save(config);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const config = await this.connection.getRepository(SystemConfiguration).findOne({ where: { isDefault: true } });
    config.githubComPasswordEnvVar = 'BARISTA_GITHUB_TOKEN';
    config.githubComUsernameEnvVar = 'BARISTA_GITHUB_USERNAME';
    config.githubEnterprisePasswordEnvVar = 'BARISTA_OSS_PASSWORD';
    config.githubEnterpriseUrlEnvVar = 'BARISTA_GHE_URL';
    config.githubEnterpriseUsernameEnvVar = 'BARISTA_OSS_USERNAME';
    await this.connection.getRepository(SystemConfiguration).save(config);
  }
}
