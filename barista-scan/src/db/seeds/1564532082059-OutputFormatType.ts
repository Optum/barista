import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { OutputFormatType } from '../../models';
import { OutputFormatTypeSeed } from './OuputFormatType.seed';

export class OutputFormatType1564532082059 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(OutputFormatType).delete({});
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(OutputFormatType).save(OutputFormatTypeSeed);
  }
}
