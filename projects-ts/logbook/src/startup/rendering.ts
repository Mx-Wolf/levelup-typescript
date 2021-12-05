import { AppContext } from '../models/app.js';
import { RowData } from '../models/row-data.js';
import { setTitle } from '../utils/document-title.js';
import { createHeader } from '../views/header.js';
import { createLogbookMain } from '../views/main.js';
import { createPivot } from '../views/pivot.js';

const collectChildren = (context: AppContext<RowData>) => {
  const { getState, setLocation } = context;

  const { location, rows, columns} = getState();
  return [
    createHeader({ location, setLocation }),
    location === 'logbook' ? createLogbookMain({
      location,
      setTitle,
      columns,
      rows,
    }) : false,
    location === 'pivot-table' ? createPivot() : false,
  ].filter((e) => e) as HTMLElement[];
};


export const createRender = (
  app:AppContext<RowData>,
  root: HTMLElement | null,
)=>{

  if(root === null){
    throw new Error('root is null');
  }
  const render = ()=>{
    const children = collectChildren(app);
    root.innerHTML = '';
    root.append(...children);
  };
  app.locationChanged.subscribe(render);
  return render;
};
