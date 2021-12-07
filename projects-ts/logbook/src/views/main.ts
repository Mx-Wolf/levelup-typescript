import { ColumnSettings, KnownLocations } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { createLogbook } from './log-book.js';
import { createPageTitle } from './page-title.js';
import { createHtmlElement } from './parser.js';

interface MainProps{
  location:KnownLocations,
  columns:ColumnSettings<RowData>[];
  rows:RowData[]
}


export const createLogbookMain = (props:MainProps)=>createHtmlElement(
  'main',
  {'class':'main'},
  [
    createPageTitle(props),
    createLogbook(props),
  ]
);


