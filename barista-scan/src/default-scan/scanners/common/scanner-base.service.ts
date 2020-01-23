import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';
import { Scanner } from '@app/default-scan/scanners/common/scanner.interface';
import { shellExecuteSync } from '@app/shared/util/shell-execute';
import { Logger } from '@nestjs/common';
import * as execa from 'execa';
import * as path from 'path';

export abstract class ScannerBaseService implements Scanner {
  protected constructor() {}

  public static toolsDir = path.resolve(__dirname, '../../../../tools');
  private baseLogger = new Logger('ScannerBaseService');
  protected completedAt: Date;
  abstract name;
  protected startedAt: Date;
  protected toolsDir = ScannerBaseService.toolsDir;

  abstract async command(jobInfo: DefaultScanWorkerJobInfo);

  public async execute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo> {
    this.startedAt = new Date();

    await this.preExecute(jobInfo).catch(error => {
      this.baseLogger.error(`preExecute: ${error}`);
    });

    const command = await this.command(jobInfo);
    if (command) {
      shellExecuteSync(command, this.options(jobInfo));
    }

    await this.postExecute(jobInfo).catch(error => {
      this.baseLogger.error(`postExecute: ${error}`);
    });

    this.completedAt = new Date();
    return jobInfo;
  }

  public options(jobInfo: DefaultScanWorkerJobInfo): execa.Options {
    return {};
  }

  abstract postExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo>;

  abstract preExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo>;
}
