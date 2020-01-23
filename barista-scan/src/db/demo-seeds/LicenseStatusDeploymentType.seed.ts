import { DeploymentType, License, LicenseStatusDeploymentType, ProjectScanStatusType } from '../../models';

export const LicenseStatusDeploymentTypeSeed: Array<Partial<LicenseStatusDeploymentType>> = [
  {
    license: { code: 'MIT' } as License,
    projectScanStatus: { code: 'yellow', description: 'yellow' } as ProjectScanStatusType,
    deploymentType: { code: 'distributed', description: 'distributed' } as DeploymentType,
  },
];
