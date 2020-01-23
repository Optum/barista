import { HasCode } from '../has-code';

export function entityCodeFilter<T extends HasCode>(entities: T[], entityCode: string) {
  return entities.filter(e => e.code === entityCode);
}
