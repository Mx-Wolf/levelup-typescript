import { AppContext } from '../models/app.js';
import { RowData } from '../models/row-data.js';

import { createHeader } from '../views/header.js';
import { createLogbookMain } from '../views/main.js';
import { createPivot } from '../views/pivot.js';

const collectChildren = (context: AppContext<RowData>) => {
  const { getState, setLocation, setPivot } = context;

  const { location, rows, columns, columnGroup: columnLabeler,aggregator: comparer,rowGroup: rowLabeler} = getState();
  return [
    createHeader({ location, setLocation }),
    location === 'logbook' ? createLogbookMain({
      location,
      columns,
      rows,
    }) : false,
    location === 'pivot-table' ? createPivot({
      columnGroup: columnLabeler,
      aggregator: comparer,
      rowGroup: rowLabeler,
      rows:getState().rows,
      setPivot
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
  app.pivotChanged.subscribe(render);
  return render;
};
