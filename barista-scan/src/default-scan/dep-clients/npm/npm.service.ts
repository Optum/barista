import { DepClientBaseService } from '@app/default-scan/dep-clients/common/dep-client-base/dep-client-base.service';
import { SystemConfiguration } from '@app/models';
import { PackageManagerEnum } from '@app/models/PackageManager';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class NpmService extends DepClientBaseService {
  constructor() {
    super();
  }
  logger = new Logger('NpmService');
  packageManagerCode = PackageManagerEnum.NPM;

  async command(workingDir: string, options?: any): Promise<string> {
    let command = 'NODE_ENV=production; npm install';
    const config = await SystemConfiguration.defaultConfiguration();

    const homeNpmrc = path.join(process.env.HOME, '.npmrc');
    if (fs.existsSync(homeNpmrc)) {
      this.logger.debug(
        `.npmrc found at ${homeNpmrc}, ignoring the configuration value at SystemConfiguration.defaultConfiguration().npmRegistry`,
      );
    } else {
      // If we don't have an .npmrc in our home directory
      // And if a registry has been configured, then let's set it here...
      if (config.npmRegistry) {
        command = `npm config set registry ${config.npmRegistry} && ${command}`;
      }
    }

    // If we are running on a real server (not development)
    // and a cache from the system config directory exists
    // then let's use it for the NPM cache.
    // TODO: Make this path cross platform compatible
    if (config.npmCacheDirectory && fs.existsSync(config.npmCacheDirectory)) {
      const cacheSubDirectory = path.join(config.npmCacheDirectory, '.npm');
      if (!fs.existsSync(cacheSubDirectory)) {
        fs.mkdirSync(cacheSubDirectory);
      }
      command = `${command} --cache ${config.npmCacheDirectory}`;
    }

    return command;
  }
}
