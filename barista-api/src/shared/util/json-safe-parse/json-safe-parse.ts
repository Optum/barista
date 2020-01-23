import toObject = require('convert-to-object');

export function jsonSafeParse(jsonString: string) {
  return toObject(jsonString);
}
