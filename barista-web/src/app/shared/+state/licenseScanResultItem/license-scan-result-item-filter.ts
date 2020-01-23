import { LicenseScanResultItem } from '@app/shared/api';

/**
 * A generic EntityFilterFn<t> used to filter objects that have a scan.
 * @see https://ngrx.io/guide/data/entity-metadata
 * @param entities The cached entities to filter.
 * @param scanId The scan.id to filter by.
 */
export function licenseScanResultItemFilter<T extends LicenseScanResultItem>(entities: T[], scanId: number) {
  return entities.filter(e => e.licenseScan.scan.id === Number(scanId));
}
