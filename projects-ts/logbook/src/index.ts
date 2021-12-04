import { createMockRowData } from './mock/rows.js';
import { columns } from './settings/columns.js';
import { createHeader } from './views/header.js';
import { createMain } from './views/main.js';

const run =(root:HTMLDivElement|null)=>{
  if(root === null){
    return;
  }
  const location = 'logbook';
  root.append(
    createHeader({location,setLocation:()=>undefined}),
    createMain({
      location,
      setTitle:(title)=>{document.title=title;},
      columns,
      data: createMockRowData(),
    }),
  );
};

run(document.querySelector('div.wrapper') as HTMLDivElement);
