import { MessageServiceBase } from '@app/shared/services/MessageServiceBase';
import { Injectable } from "@angular/core";

@Injectable()
export class ToolTipsDataChangedMessageService extends MessageServiceBase<string> {
  send(notUsed: string) {
    super.internalSend('tool-tip-data-changed', notUsed);
  }
}
