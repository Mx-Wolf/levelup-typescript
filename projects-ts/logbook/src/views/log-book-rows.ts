import { ColumnSettings } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { createHtmlElement } from './parser.js';
import { createTableDataCell } from './table-td.js';

interface LogbookRowsProps{
  rows: RowData[];
  columns: ColumnSettings<RowData>[];
}


const createLogbookRow = (r:RowData, props:LogbookRowsProps):HTMLTableRowElement=>{
  const {columns} = props;
  const tr = createHtmlElement('tr');
  tr.className = 'table__row';
  tr.append(...columns.map((c)=>createTableDataCell(r,c)));
  return tr as HTMLTableRowElement;
};
export const createLogbookRows = (props:LogbookRowsProps):HTMLTableRowElement[]=>{
  const {rows} = props;
  return rows.map((r)=>createLogbookRow(r,props));
};
