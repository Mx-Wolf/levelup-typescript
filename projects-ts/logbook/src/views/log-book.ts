import { ColumnSettings } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { createLogbookHeader } from './log-book-header.js';
import { createLogbookRows } from './log-book-rows.js';
import { parseHtmlElement } from './parser.js';

interface LogbookProps{
  columns:ColumnSettings<RowData>[],
  rows:RowData[]
}

const template = `<div class="table">
  <table class="table__table">
    <thead class="table__header">
    </thead>
    <tbody>
    </tbody>
  </table>
</div>`;

const ensureHeader = (item:HTMLTableSectionElement|null, props:LogbookProps)=>{
  if(item === null){
    return;
  }
  item.append(createLogbookHeader(props.columns));
};

const ensureBody = (item:HTMLTableSectionElement | null, props:LogbookProps)=>{
  if(item === null){
    return;
  }
  item.append(...createLogbookRows(props));
};

const ensureContent = (item:HTMLElement| null, props:LogbookProps)=>{
  if(item === null){
    return;
  }
  ensureHeader(item.querySelector('thead'),props);
  ensureBody(item.querySelector('tbody'), props);
};

export const createLogbook = (props: LogbookProps)=>{
  const item = parseHtmlElement(template);
  ensureContent(item, props);
  return item;
};
