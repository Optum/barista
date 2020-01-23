import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import * as rp from 'request-promise';
import * as URL from 'url';

export async function fetchBinaryFromUrl(url: string, workingDirectory: string) {
  const logger = new Logger('fetchUrlSync');

  const urlParts = URL.parse(url);
  const filename = path.basename(urlParts.pathname);
  const targetFilePath = path.join(workingDirectory, filename);

  try {
    const BARISTA_OSS_USERNAME = process.env.BARISTA_OSS_USERNAME;
    const BARISTA_OSS_PASSWORD = process.env.BARISTA_OSS_PASSWORD;
    const HTTPS_PROXY_SERVER = process.env.HTTPS_PROXY_SERVER;
    const HTTPS_PROXY_PORT = process.env.HTTPS_PROXY_PORT;

    let requestFn = () => {
      logger.log('--- NOT Adding proxy information to the fetch.');
      return rp(url, { encoding: null });
    };

    logger.log(`BARISTA_OSS_USERNAME:${!_.isEmpty(BARISTA_OSS_USERNAME)}\n \
      BARISTA_OSS_PASSWORD:${!_.isEmpty(BARISTA_OSS_PASSWORD)}\n \
      HTTPS_PROXY_SERVER: ${HTTPS_PROXY_SERVER}\n \
      HTTPS_PROXY_PORT: ${HTTPS_PROXY_PORT}`);

    if (BARISTA_OSS_USERNAME && BARISTA_OSS_PASSWORD && HTTPS_PROXY_SERVER && HTTPS_PROXY_PORT) {
      const proxy = `http://${BARISTA_OSS_USERNAME}:${BARISTA_OSS_PASSWORD}@${HTTPS_PROXY_SERVER}:${HTTPS_PROXY_PORT}`;

      requestFn = () => {
        logger.log('+++ Adding proxy information to the fetch.');
        return rp({
          url,
          proxy,
          encoding: null,
        });
      };
    }

    const response: any = await requestFn().catch(error => {
      logger.error(`fetchUrlSync() error: ${error}`);
    });

    if (response) {
      fs.writeFileSync(targetFilePath, response);
      return Promise.resolve(filename);
    } else {
      const message = 'fetchUrlSync() empty response';
      logger.error(message);
      return Promise.reject(new Error(message));
    }
  } catch (error) {
    const message = `fetchUrlSync(${url}) error: ${error}`;
    logger.error(message);
    return Promise.reject(new Error(message));
  }
}
