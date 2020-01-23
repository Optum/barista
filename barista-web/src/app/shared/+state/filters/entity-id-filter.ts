import { HasId } from '@app/shared/+state/has-id';

export function entityIdFilter<T extends HasId>(entities: T[], entityId: number) {
  return entities.filter(e => e.id === Number(entityId));
}
