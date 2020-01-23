import { SecurityScanResultItemStatusType } from '../../models';

export const SecurityScanResultItemStatusTypeSeed: Array<Partial<SecurityScanResultItemStatusType>> = [
  {
    code: 'low',
    description: 'Low',
    isDefault: true,
    sortOrder: 0,
  },
  {
    code: 'medium',
    description: 'Medium',
    sortOrder: 1,
  },
  {
    code: 'high',
    description: 'High',
    sortOrder: 3,
  },
  {
    code: 'critical',
    description: 'Critical',
    sortOrder: 4,
  },
];
