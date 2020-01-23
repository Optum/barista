import { PackageManagerEnum } from '@app/models/PackageManager';

export interface DepClient {
  packageManagerCode: PackageManagerEnum;
  fetchDependencies(workingDir: string, options?: any): Promise<void>;
}
