import { appEnvironment } from '@app/info/app-environment';
import { appVersion } from '@app/info/app-version';
import { appCommitHash } from '@app/info/commit-hash';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  appStatus(): any {
    return {
      appName: 'barista-scan',
      appEnvironment,
      appVersion,
      appCommitHash,
      nodeEnv: process.env.NODE_ENV,
    };
  }

  prettyAppStatus(): string {
    const appInfo = this.appStatus();
    return JSON.stringify(appInfo, null, 4);
  }
}
