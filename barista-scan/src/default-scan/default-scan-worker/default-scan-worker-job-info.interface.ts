export interface DefaultScanWorkerJobInfo {
  appDir?: string;
  command?: string;
  dataDir?: string;
  errors?: Error[];
  projectName?: string;
  scanId?: number;
  tmpDir?: string;
  toolsDir?: string;
}
