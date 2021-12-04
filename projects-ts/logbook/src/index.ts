import { createMockRowData } from './mock/rows.js';
import { RowData } from './models/app-state.js';
import { AppContext, createApp } from './models/app.js';
import { columns } from './settings/columns.js';
import { createHeader } from './views/header.js';
import { createMain } from './views/main.js';
import { createPivot } from './views/pivot.js';


const collectChildren = (context:AppContext<RowData>)=>{
  const {getState}= context;
  const {location, rows} = getState();
  return [
    createHeader({location,setLocation:()=>undefined}),
    location==='logbook'?createMain({
      location,
      setTitle:(title)=>{document.title=title;},
      columns,
      rows,
    }):false,
    location==='pivot-table'? createPivot():false,
  ].filter((e)=>e) as HTMLElement[];
};
const run =(root:HTMLDivElement|null)=>{
  if(root === null){
    return;
  }
  const data = createMockRowData();
  const app = createApp<RowData>({
    columnLabeler:'key in functions catalog to show labels on top',
    comparer: 'key in functions catalog to compare rows for grouping',
    location: 'logbook',
    message: undefined,
    rowCount: data.length,
    rowLabeler: 'key in function catalog to show labels on the left',
    rows: data,
    rowsState: 'ready',
  });
  const children = collectChildren(app);
  root.innerHTML='';
  root.append(...children  );
};

run(document.querySelector('div.wrapper') as HTMLDivElement);
