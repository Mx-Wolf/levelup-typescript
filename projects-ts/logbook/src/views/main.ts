import { ColumnSettings, KnownLocations } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { createLogbook } from './log-book.js';
import { createPageTitle } from './page-title.js';
import { parseHtmlElement } from './parser.js';

interface MainProps{
  location:KnownLocations,
  setTitle:(title:string)=>void;
  columns:ColumnSettings<RowData>[];
  rows:RowData[]
}

const template = `<main class="main">
</main>`;

const ensureContent =(item:HTMLElement|null, props:MainProps)=>{
  if(item === null){
    return;
  }

  item.append(
    createPageTitle(props),
    createLogbook(props),
  );
};

export const createMain = (props:MainProps)=>{
  const item = parseHtmlElement(template);
  ensureContent(item,props);
  return item;
};
