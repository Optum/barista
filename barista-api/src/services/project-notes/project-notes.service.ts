import { ProjectNote } from '@app/models';
import { AppServiceBase } from '@app/services/app-service-base/app-base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectNotesService extends AppServiceBase<ProjectNote> {
  constructor(@InjectRepository(ProjectNote) repo) {
    super(repo);
  }

  async insert(note: ProjectNote) {
    await this.repo.insert(note);
  }
}
