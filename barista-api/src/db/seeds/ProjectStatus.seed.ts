import { ProjectStatusType } from '../../models';

export const ProjectStatusTypeSeed: Array<Partial<ProjectStatusType>> = [
  {
    code: 'new',
    description: 'Not yet scanned',
    isDefault: true,
  },
  {
    code: 'scanning',
    description: 'Scanning in process',
  },
  {
    code: 'success',
    description: 'Last scan completed successfully',
  },
  {
    code: 'error',
    description: 'Last scan completed with error',
  },
];
