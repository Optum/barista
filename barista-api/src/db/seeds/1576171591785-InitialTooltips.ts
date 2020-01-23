import { InitialToolTipsSeed } from '@app/db/seeds/InitialToolTips.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { ToolTip } from '../../models';

export class InitialTooltips1576171591785 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(ToolTip).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(ToolTip).save(InitialToolTipsSeed);
  }
}
