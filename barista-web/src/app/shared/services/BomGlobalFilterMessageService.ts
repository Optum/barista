import { MessageServiceBase } from '@app/shared/services/MessageServiceBase';
import { Injectable } from "@angular/core";

@Injectable()
export class BomGlobalFilterMessageService extends MessageServiceBase<string> {
  send(bomGlobalFilter: string) {
    super.internalSend('bom-global-filter', bomGlobalFilter);
  }
}
