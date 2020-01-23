import { MessageServiceBase } from '@app/shared/services/MessageServiceBase';

export class ToolTipsDataChangedMessageService extends MessageServiceBase<string> {
  send(notUsed: string) {
    super.internalSend('tool-tip-data-changed', notUsed);
  }
}
