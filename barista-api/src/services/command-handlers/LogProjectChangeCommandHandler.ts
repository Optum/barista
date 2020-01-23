import { Project, ProjectNote } from '@app/models';
import { LogProjectChangeCommand } from '@app/models/commands/LogProjectChangeCommand';
import { ProjectNotesService } from '@app/services/project-notes/project-notes.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(LogProjectChangeCommand)
export class LogProjectChangeCommandHandler implements ICommandHandler<LogProjectChangeCommand> {
  constructor(private notesService: ProjectNotesService) {}

  async execute(command: LogProjectChangeCommand): Promise<any> {
    const note = {
      note: `${command.action} - ${command.notes}`,
      notePayload: command.notePayload,
      project: {
        id: command.projectId,
      } as Project,
      userId: command.userId,
    } as ProjectNote;

    return this.notesService.insert(note);
  }
}
