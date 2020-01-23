import { ProjectScanStatusType } from '../../models';

export const ProjectScanStatusTypeSeed: Array<Partial<ProjectScanStatusType>> = [
  {
    code: 'green',
    description: 'Green',
    isDefault: true,
    sortOrder: 0,
  },
  {
    code: 'yellow',
    description: 'Yellow',
    sortOrder: 1,
  },
  {
    code: 'red',
    description: 'Red',
    sortOrder: 2,
  },
];
