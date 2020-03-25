import { BomSecurityException } from '@app/shared/api';
import { MessageServiceBase } from '@app/shared/services/MessageServiceBase';
import { Injectable } from "@angular/core";

@Injectable()
export class BomSecurityExceptionOperationMessageService extends MessageServiceBase<BomSecurityException> {
  send(bomSecurityException: BomSecurityException) {
    super.internalSend('bom-security-exception-operation', bomSecurityException);
  }
}
