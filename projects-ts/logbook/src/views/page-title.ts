import { KnownLocations } from '../models/app-state.js';
import { labels } from '../settings/labels.js';
import { parseHtmlElement } from './parser.js';

interface PageTitleProps{
  location:KnownLocations;
  setTitle:(title:string)=>void;
}

const template = `<h1 class="title title--page visually-hidden">
</h1>`;

const ensureTitle=(item:HTMLElement|null, title:string)=>{
  if(item === null){
    return;
  }
  item.innerText = title;
};

export const createPageTitle = (props: PageTitleProps)=>{
  const {location,setTitle} = props;
  const item = parseHtmlElement(template);
  const title = labels[location];
  ensureTitle(item,title);
  setTitle(title);
  return item;
};
