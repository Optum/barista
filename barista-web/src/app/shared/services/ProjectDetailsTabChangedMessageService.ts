import { MessageServiceBase } from '@app/shared/services/MessageServiceBase';
import { ProjectDetailsTabChangedMessageServiceModel } from '@app/shared/services/models/ProjectDetailsTabChangedMessageServiceModel';

export class ProjectDetailsTabChangedMessageService extends MessageServiceBase<
  ProjectDetailsTabChangedMessageServiceModel
> {
  send(model: ProjectDetailsTabChangedMessageServiceModel) {
    super.internalSend('project-details-tab-changed', model);
  }
}
