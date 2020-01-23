import * as pit from 'p-iteration';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { Project, ProjectDevelopmentType } from '../../models';

export class ProjectDevelopmentType1569283524047 implements MigrationInterface {
  connection = getConnection('seed');

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.connection.getRepository(ProjectDevelopmentType).delete({});

    const projects = await this.connection.getRepository(Project).find({});

    await pit.forEachSeries(projects, async project => {
      if (project.developmentType) {
        project.developmentType = null;
        await this.connection.getRepository(Project).save(project);
      }
    });
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const seed = [
      {
        code: 'organization',
        description: 'Developed by the organization internally',
        isDefault: true,
      },
      {
        code: 'community',
        description: 'Developed by the community and used by the organization',
      },
    ];

    await this.connection.getRepository(ProjectDevelopmentType).save(seed);

    const projects = await this.connection.getRepository(Project).find({});

    await pit.forEachSeries(projects, async project => {
      if (!project.developmentType) {
        project.developmentType = { code: 'organization' } as ProjectDevelopmentType;
        await this.connection.getRepository(Project).save(project);
      }
    });
  }
}
