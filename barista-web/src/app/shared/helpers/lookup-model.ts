export interface ILookupModel {
  code: string;
  isDefault: boolean;
}

export function compareLookupModels(m1: ILookupModel, m2: ILookupModel) {
  return m1 && m2 && m1.code === m2.code;
}
