import { MessageServiceBasePayload } from '@app/shared/services/MessageServiceBasePayload';
import { Observable, Subject } from 'rxjs';

export class MessageServiceBase<T> {
  private subject = new Subject<MessageServiceBasePayload<T>>();

  clear() {
    this.subject.next();
  }

  get(): Observable<MessageServiceBasePayload<T>> {
    return this.subject.asObservable();
  }

  protected internalSend(message: string, data: T) {
    this.subject.next({ message, payload: data });
  }
}
