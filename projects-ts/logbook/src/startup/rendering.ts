import { AppContext } from '../models/app.js';
import { RowData } from '../models/row-data.js';

import { createHeader } from '../views/header.js';
import { createLogbookMain } from '../views/main.js';
import { createPivot } from '../views/pivot.js';

const collectChildren = (context: AppContext<RowData>) => {
  const { getState, setLocation } = context;

  const { location, rows, columns, columnLabeler,comparer,rowLabeler} = getState();
  return [
    createHeader({ location, setLocation }),
    location === 'logbook' ? createLogbookMain({
      location,
      columns,
      rows,
    }) : false,
    location === 'pivot-table' ? createPivot({
      columnLabeler,
      comparer,
      rowLabeler,
      rows:getState().rows
    }) : false,
  ].filter((e) => e) as HTMLElement[];
};

const replaceChildren = (item:HTMLElement, children:HTMLElement[])=>{
  item.innerHTML='';
  item.append(...children);
};

export const createRender = (
  app:AppContext<RowData>,
  root: HTMLElement | null,
)=>{

  if(root === null){
    throw new Error('root is null');
  }

  const render = ()=> replaceChildren(root,collectChildren(app));

  app.locationChanged.subscribe(render);
  return render;
};
