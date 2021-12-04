import { createMockRowData } from './mock/rows.js';
import { RowData } from './models/app-state.js';
import { AppContext, createApp } from './models/app.js';
import { columns } from './settings/columns.js';
import { createHeader } from './views/header.js';
import { createMain } from './views/main.js';
import { createPivot } from './views/pivot.js';

let rerender:(()=>void) | null = null;

const app = createApp<RowData>({
  columnLabeler: 'key in functions catalog to show labels on top',
  comparer: 'key in functions catalog to compare rows for grouping',
  location: 'logbook',
  message: undefined,
  rowCount: 0,
  rowLabeler: 'key in function catalog to show labels on the left',
  rows: createMockRowData(),
  rowsState: 'ready',
});
const handleLocationChange = ()=>{
  if(rerender === null){
    return;
  }
  rerender();
};
app.locationChanged.subscribe(handleLocationChange);
const root = document.querySelector('div.wrapper') as HTMLDivElement;

const collectChildren = (context: AppContext<RowData>) => {
  const { getState, setLocation } = context;

  const { location, rows, } = getState();
  return [
    createHeader({ location, setLocation }),
    location === 'logbook' ? createMain({
      location,
      setTitle: (title) => { document.title = title; },
      columns,
      rows,
    }) : false,
    location === 'pivot-table' ? createPivot() : false,
  ].filter((e) => e) as HTMLElement[];
};
const run = () => {
  if (root === null) {
    return;
  }

  const children = collectChildren(app);
  root.innerHTML = '';
  root.append(...children);
};

rerender = () => run();
rerender();
