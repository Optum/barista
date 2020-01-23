import { ILookupModel } from '@app/shared/helpers/lookup-model';
import { find } from 'lodash';

export function getDefaultValue(elements: Array<ILookupModel>, code: string = null) {
  let result = null;
  if (code) {
    result = find(elements, { code });
  }

  return result || find(elements, { isDefault: true });
}

export function validateJson(json: string): boolean {
  // assume empty string is ok
  if (!json || !json.length || !json.trim().length) {
    return true;
  }

  try {
    const o = JSON.parse(json);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === 'object') {
      return true;
    }
  } catch (e) {}

  return false;
}
