import { ColumnSettings } from '../../models/app-state.js';
import { createHtmlElement, createText } from '../../views/parser.js';

interface TableProps<T>{
  rows:T[]
  columns:ColumnSettings<T>[]
  tableClass: string,
  headerClass: string,
  headerRowClass: string,
  headerRowCellClass: string;
  tbodyClass: string;
  dataRowClass: string;
  dataRowCellClass: string;
}
const createTCell = <T>(tag: 'th'|'td',row:T,column:ColumnSettings<T>, attribures:Record<string,string>)=> createHtmlElement(
  tag,
  attribures,
  [
    createText(column.format(row))
  ]
);
const createTRow = (rowClass:string, children: Node[])=>createHtmlElement(
  'tr',
  {'class': rowClass},
  children
);
const createTHead = <T>(props:TableProps<T>)=>{
  const {headerClass} = props;
  return createHtmlElement(
    'thead',
    {'class': headerClass},
    [
      createTRow(props.headerRowClass,
        props.columns.map((column)=>createTCell(
          'th',
          {value: column.label},
          {...column, format:(r:{value: string})=>r.value, orderBy:undefined},
          {'class':props.headerRowCellClass})),
      )
    ]
  );
};

const createTBody = <T>(props:TableProps<T>):HTMLElement=> {
  const {tbodyClass, rows, columns, dataRowCellClass, dataRowClass} = props;
  return createHtmlElement(
    'tbody',
    {'class': tbodyClass},
    rows.map((row)=>createTRow(dataRowClass,
      columns.map((column)=>createTCell('td',row,column,
        {'class':dataRowCellClass}))
    ))
  );
};

export const createTable = <T>(props:TableProps<T>)=>{
  const {tableClass} = props;
  return createHtmlElement('table',
    {'class':tableClass},
    [
      createTHead(props),
      createTBody(props),
    ]
  );
};
