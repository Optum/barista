import { DeploymentType } from '../../models';

export const DeploymentTypeSeed: Array<Partial<DeploymentType>> = [
  {
    code: 'unspecified',
    description: 'Unspecified',
    isDefault: true,
  },
  {
    code: 'distributed',
    description: 'Distributed',
  },
  {
    code: 'internal',
    description: 'Internally Consumed',
  },
  {
    code: 'external',
    description: 'Externally Facing Internal Hosted',
  },
];
