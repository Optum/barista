import { getFileContentsSync } from '@app/shared/util/get-file-contents-sync';
import { Logger } from '@nestjs/common';
import { Parser } from 'xml2js';

export function convertXmlToJsonObject(xml: string) {
  return new Promise<any>((resolve, reject) => {
    const logger = new Logger('ConvertXmlToJsonObject');
    try {
      const parser = new Parser({ explicitArray: false });
      parser.parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(result);
        } else {
          const message = `convertXmlToJsonObject() [No err or result returned]\n[${xml}}]`;
          this.logger.error(message);
          reject({ message });
        }
      });
    } catch (error) {
      this.logger.error(`convertXmlToJsonObject() error: ${error}\n[${xml}}]`);
      reject(error);
    }
  });
}

export function convertXmlFileToJsonObject(xmlFilename: string) {
  return convertXmlToJsonObject(getFileContentsSync(xmlFilename));
}
