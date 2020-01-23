import { DepClientBaseService } from '@app/default-scan/dep-clients/common/dep-client-base/dep-client-base.service';
import { PackageManagerEnum } from '@app/models/PackageManager';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class Python3PipService extends DepClientBaseService {
  logger = new Logger('Python3PipService');
  packageManagerCode = PackageManagerEnum.PYTHON3_PIP;

  constructor() {
    super();
  }

  async command(workingDir: string, options?: any): Promise<string> {
    // If the user has specified a custom requirements file then let's apply it
    let requirementsFile = 'requirements.txt';
    if (options && options.hasOwnProperty('customPackageManagerFilename')) {
      requirementsFile = options.customPackageManagerFilename;
    }

    let pythonVersion = '3.7.5';

    const packageManager = await this.getPackageManager();
    if (
      packageManager.metaData &&
      packageManager.metaData.hasOwnProperty('pythonVersion') &&
      packageManager.metaData.pythonVersion
    ) {
      pythonVersion = packageManager.metaData.pythonVersion;
    }

    // tslint:disable:max-line-length

    // command using only pyenv to manage environments
    
    const command = `cd ${workingDir} && pyenv local ${pythonVersion} && python3 -m venv ./env && source env/bin/activate && pip install -r ${requirementsFile}`;

    // tslint:enable:max-line-length

    return command;
  }
}
