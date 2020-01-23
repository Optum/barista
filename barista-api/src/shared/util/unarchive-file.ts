import { Logger } from '@nestjs/common';
import unpacker = require('all-unpacker');

export async function unarchiveFile(filePath: string, targetDir: string = null, options: any = { noDirectory: true }) {
  if (targetDir) {
    options.targetDir = targetDir;
  }

  const logger = new Logger('unarchiveFile');

  try {
    return new Promise((resolve, reject) => {
      unpacker.unpack(filePath, options, (err, files, text) => {
        if (err) {
          reject(err);
        } else {
          resolve({ files, text });
        }
      });
    });
  } catch (error) {
    const message = `unarchiveFile(${filePath}) error: ${error}`;
    logger.error(message);
    return Promise.reject(new Error(message));
  }
}
