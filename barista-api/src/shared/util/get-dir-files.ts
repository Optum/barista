import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export function getDirFiles(dir): string[] {
  const logger = new Logger('GetDirFile');
  const dirItems = fs.readdirSync(dir);

  const files = [];

  dirItems.forEach(item => {
    const filename = path.join(dir, item);
    try {
      if (fs.statSync(filename).isFile()) {
        files.push(filename);
      }
    } catch (e) {
      logger.error(`item: ${filename} / error: ${e}`);
    }
  });

  return files;
}
