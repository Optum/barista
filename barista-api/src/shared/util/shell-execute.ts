import { Logger } from '@nestjs/common';
import * as execa from 'execa';

export function shellExecuteSync(command: string, options: any = {}): string {
  const logger = new Logger('ShellExecuteSync');
  try {
    logger.log(`*** command STARTED: ${command}`);
    const { stdout } = execa.commandSync(command, {
      ...options,
      stdio: 'inherit',
      shell: true,
    });
    logger.log(`*** command COMPLETED: ${command}`);
    return stdout;
  } catch (error) {
    logger.error(`*** command ERROR: ${error} ${command}`);
  }
}

export function shellExecute(command: string, options: any = {}): Promise<void> {
  const logger = new Logger('ShellExecute');
  logger.log(`*** command STARTED: ${command}`);
  return execa
    .command(command, { ...options, stdio: 'inherit', shell: true })
    .then(() => {
      logger.log(`*** command COMPLETED: ${command}`);
    })
    .catch(error => {
      logger.error(`*** command ERROR: ${error} ${command}`);
    });
}
