import { appEnvironment } from '@app/info/app-environment';
import { appVersion } from '@app/info/app-version';
import { appCommitHash } from '@app/info/commit-hash';
import { LicenseService } from '@app/services/license/license.service';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private licenseService: LicenseService) {}
  logger = new Logger('AppService');

  appStatus(): any {
    return {
      appName: 'barista-api',
      appEnvironment,
      appVersion,
      appCommitHash,
      nodeEnv: process.env.NODE_ENV,
      appMetaData: {
        authType: process.env.AUTH_TYPE,
      },
    };
  }

  async onApplicationBootstrap(): Promise<any> {
    this.logger.warn(this.prettyAppStatus());
    return this.licenseService.refreshLicenses();
  }

  prettyAppStatus(): string {
    const appInfo = this.appStatus();
    return JSON.stringify(appInfo, null, 4);
  }
}
