import * as fs from 'fs';

export function getFileContentsSync(filename: string, options: any = { encoding: 'utf8' }) {
  let xml = null;
  try {
    if (fs.existsSync(filename)) {
      xml = fs.readFileSync(filename, options);
    }
  } catch (error) {
    this.logger.error(`getFileContents(${filename}) error: ${error}`);
  }
  return xml;
}
