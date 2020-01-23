import { DefaultScanWorkerJobInfo } from '@app/default-scan/default-scan-worker/default-scan-worker-job-info.interface';

export interface Scanner {
  name: string;
  command(jobInfo: DefaultScanWorkerJobInfo): string;
  execute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo>;
  postExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo>;

  preExecute(jobInfo: DefaultScanWorkerJobInfo): Promise<DefaultScanWorkerJobInfo>;
}
