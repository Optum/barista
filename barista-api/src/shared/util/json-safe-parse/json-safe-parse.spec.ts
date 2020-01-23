// tslint:disable:ordered-imports
import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { jsonSafeParse } from '@app/shared/util/json-safe-parse/json-safe-parse';
// tslint:enable:ordered-imports

describe('JSON Safe Parse', () => {
  it('safely parses JSON', async done => {
    const badJson = fs.readFileSync(path.join(__dirname, 'json-safe-parse.mock.json'));

    expect(badJson).toBeDefined();

    const actual = jsonSafeParse(badJson.toString());

    expect(actual).toBeDefined();

    done();
  });
});
