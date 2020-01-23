import { HasOneProject } from '@app/shared/+state/project/has-one-project';

/**
 * A generic EntityFilterFn<t> used to filter objects that have a project.
 * @see https://ngrx.io/guide/data/entity-metadata
 * @param entities The cached entities to filter.
 * @param projectId The project.id to filter by.
 */
export function entityProjectFilter<T extends HasOneProject>(entities: T[], projectId: number) {
  return entities.filter(e => e.project.id === Number(projectId));
}
