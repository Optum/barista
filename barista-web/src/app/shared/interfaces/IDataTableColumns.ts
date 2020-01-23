import { PipeTransform, TemplateRef } from '@angular/core';
import SortDirEnum from '@app/shared/interfaces/SortDirEnum';

export default interface IDataTableColumns {
  canAutoResize?: boolean;
  cellClass?: any;
  cellTemplate?: TemplateRef<any>;
  checkboxable?: boolean;
  comparator?: (valA: any, valB: any, rowA: any, rowB: any, sortDir: SortDirEnum) => number;
  draggable?: boolean;
  flexGrow?: number;
  frozenLeft?: boolean;
  frozenRight?: boolean;
  headerCheckboxable?: boolean;
  headerClass?: any;
  headerTemplate?: TemplateRef<any>;
  maxWidth?: number;
  minWidth?: number;
  name?: string;
  pipe?: PipeTransform;
  prop?: string;
  resizeable?: boolean;
  sortable?: boolean;
  width?: number;
}
