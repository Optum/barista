import { DepClientBaseService } from '@app/default-scan/dep-clients/common/dep-client-base/dep-client-base.service';
import { ScannerBaseService } from '@app/default-scan/scanners/common/scanner-base.service';
import { PackageManagerEnum } from '@app/models/PackageManager';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class NugetService extends DepClientBaseService {
  packageManagerCode = PackageManagerEnum.NUGET;

  constructor() {
    super();
  }

  async command(workingDir: string, options?: any): Promise<string> {
    let command = `mono --runtime=v4.0 ${path.join(
      ScannerBaseService.toolsDir,
      'nuget',
      'nuget.exe',
    )} restore -OutputDirectory ./dependencies -DirectDownload -PackageSaveMode nuspec  -Recursive -Force`;
    if (options && options.hasOwnProperty('customPackageManagerFilename')) {
      let filepath = options.customPackageManagerFilename;

      if (options.hasOwnProperty('customPackageManagerPath')) {
        filepath = path.join(options.customPackageManagerPath, options.customPackageManagerFilename);
      }

      command = `${command} ${filepath}`;
    }

    return command;
  }
}
