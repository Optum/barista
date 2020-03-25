import { BomLicenseException } from '@app/shared/api';
import { MessageServiceBase } from '@app/shared/services/MessageServiceBase';
import { Injectable } from "@angular/core";

@Injectable()
export class BomLicenseExceptionOperationMessageService extends MessageServiceBase<BomLicenseException> {
  send(bomLicenseException: BomLicenseException) {
    super.internalSend('bom-license-exception-operation', bomLicenseException);
  }
}
