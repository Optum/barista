import { DepClientBaseService } from '@app/default-scan/dep-clients/common/dep-client-base/dep-client-base.service';
import { PackageManagerEnum } from '@app/models/PackageManager';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MavenService extends DepClientBaseService {
  packageManagerCode = PackageManagerEnum.MAVEN;

  constructor() {
    super();
  }

  /**
   * Appends a settings.xml file to a maven command.
   * @param command
   */
  static appendSettings(command: string) {
    // TODO: Abstract this logic so that it comes from the system settings
    // If there is a settings.xml at a specific place lets' append it to the command
    const customSettingsPath = path.join('/', '.m2', 'settings.xml');
    if (fs.existsSync(customSettingsPath)) {
      command = `${command} -s ${customSettingsPath}`;
    }

    return command;
  }

  async command(workingDir: string, options?: any): Promise<string> {
    let command = 'mvn -e dependency:copy-dependencies';
    command = MavenService.appendSettings(command);

    // If the user has specified a custom pom.xml file then let's apply it
    let customPom = null;
    if (options && options.hasOwnProperty('customPackageManagerFilename')) {
      customPom = options.customPackageManagerFilename;
    }

    if (customPom) {
      command = `${command} -f ${customPom}`;
    }

    return command;
  }
}
