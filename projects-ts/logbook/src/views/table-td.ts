import { ColumnSettings, RowData } from '../models/app-state.js';
import { createHtmlElement } from './parser.js';
import { css } from './table-th.js';

export const createTableDataCell = (r:RowData, c:ColumnSettings<RowData>):HTMLTableCellElement=>{
  const item = createHtmlElement('td');
  item.className = css(c.size);
  item.innerText = c.format(r);
  return item as HTMLTableCellElement;
};
