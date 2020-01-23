import { OutputFormatType } from '../../models';

export const OutputFormatTypeSeed: Array<Partial<OutputFormatType>> = [
  {
    code: 'json',
    description: 'JSON output',
    isDefault: true,
  },
  {
    code: 'word',
    description: 'Word output',
  },
  {
    code: 'excel',
    description: 'Excel output',
  },
];
