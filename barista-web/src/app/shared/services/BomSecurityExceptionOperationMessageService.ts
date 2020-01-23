import { BomSecurityException } from '@app/shared/api';
import { MessageServiceBase } from '@app/shared/services/MessageServiceBase';

export class BomSecurityExceptionOperationMessageService extends MessageServiceBase<BomSecurityException> {
  send(bomSecurityException: BomSecurityException) {
    super.internalSend('bom-security-exception-operation', bomSecurityException);
  }
}
