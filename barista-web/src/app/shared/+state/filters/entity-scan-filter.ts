import { HasOneScan } from '@app/shared/+state/scan/has-one-scan';

/**
 * A generic EntityFilterFn<t> used to filter objects that have a scan.
 * @see https://ngrx.io/guide/data/entity-metadata
 * @param entities The cached entities to filter.
 * @param scanId The scan.id to filter by.
 */
export function entityScanFilter<T extends HasOneScan>(entities: T[], scanId: number) {
  return entities.filter(e => e.scan.id === Number(scanId));
}
