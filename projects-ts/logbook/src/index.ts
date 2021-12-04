import { createHeader } from './views/header.js';

const run =(root:HTMLDivElement|null)=>{
  if(root === null){
    return;
  }
  const header = createHeader({location:'logbook',setLocation:()=>undefined});
  root.appendChild(header);
};

run(document.querySelector('div.wrapper') as HTMLDivElement);
