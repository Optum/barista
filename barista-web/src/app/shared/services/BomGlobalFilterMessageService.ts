import { MessageServiceBase } from '@app/shared/services/MessageServiceBase';

export class BomGlobalFilterMessageService extends MessageServiceBase<string> {
  send(bomGlobalFilter: string) {
    super.internalSend('bom-global-filter', bomGlobalFilter);
  }
}
