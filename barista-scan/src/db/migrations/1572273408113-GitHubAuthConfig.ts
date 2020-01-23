import { MigrationInterface, QueryRunner } from 'typeorm';

export class GitHubAuthConfig1572273408113 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "ghcom_username_env_var"`);
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "ghcom_password_env_var"`);
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "ghe_username_env_var"`);
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "ghe_password_env_var"`);
    await queryRunner.query(`ALTER TABLE "system_configuration" DROP COLUMN "ghe_url_env_var"`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "ghe_url_env_var" character varying`);
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "ghe_password_env_var" character varying`);
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "ghe_username_env_var" character varying`);
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "ghcom_password_env_var" character varying`);
    await queryRunner.query(`ALTER TABLE "system_configuration" ADD "ghcom_username_env_var" character varying`);
  }
}
