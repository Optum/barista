import { PackageManager } from '@app/models';

export const PackageManagerSeed: Array<Partial<PackageManager>> = [
  {
    description: 'Maven',
    code: 'maven',
  },
  {
    description: 'NuGet',
    code: 'nuget',
  },
  {
    description: 'NPM',
    code: 'npm',
    isDefault: true,
  },
  {
    description: 'None',
    code: 'none',
  },
];
