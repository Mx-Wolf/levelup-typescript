import { ColumnSettings } from '../models/app-state.js';
import { createHtmlElement } from './parser.js';
import { createTableHeadCell } from './table-th.js';

export const createLogbookHeader = <T>(columns: ColumnSettings<T>[]):HTMLTableRowElement=>{
  const item = createHtmlElement('tr');
  item.className = 'table__row';
  item.append(...columns.map((e)=>createTableHeadCell({label:e.label, modifier:e.size})));
  return item as HTMLTableRowElement;
};
