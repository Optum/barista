import { DepClient } from '@app/default-scan/dep-clients/common/dep-client.interface';
import { PackageManager } from '@app/models';
import { shellExecute } from '@app/shared/util/shell-execute';

export abstract class DepClientBaseService implements DepClient {
  abstract packageManagerCode;

  protected abstract async command(workingDir: string, options?: any): Promise<string>;

  async fetchDependencies(workingDir: string, options: any): Promise<void> {
    return shellExecute(await this.command(workingDir, options), {
      cwd: workingDir,
    });
  }

  async getPackageManager() {
    return PackageManager.findOne(this.packageManagerCode);
  }
}
