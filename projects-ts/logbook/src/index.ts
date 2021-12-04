import { createHeader } from './views/header.js';
import { createMain } from './views/main.js';

const run =(root:HTMLDivElement|null)=>{
  if(root === null){
    return;
  }
  root.append(
    createHeader({location:'logbook',setLocation:()=>undefined}),
    createMain(),
  );
};

run(document.querySelector('div.wrapper') as HTMLDivElement);
