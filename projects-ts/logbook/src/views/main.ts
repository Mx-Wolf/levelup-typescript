import { KnownLocations } from '../models/app-state.js';
import { createLogBook } from './log-book.js';
import { createPageTitle } from './page-title.js';
import { parseHtmlElement } from './parser.js';

interface MainProps{
  location:KnownLocations,
  setTitle:(title:string)=>void;
}

const template = `<main class="main">
</main>`;

const ensureContent =(item:HTMLElement|null, props:MainProps)=>{
  if(item === null){
    return;
  }

  item.append(
    createPageTitle(props),
    createLogBook(),
  );
};

export const createMain = (props:MainProps)=>{
  const item = parseHtmlElement(template);
  ensureContent(item,props);
  return item;
};
