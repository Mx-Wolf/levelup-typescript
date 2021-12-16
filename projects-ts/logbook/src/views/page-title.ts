import { KnownLocations } from '../models/app-state.js';
import { labels } from '../settings/labels.js';
import { parseHtmlElement } from './parser.js';
import { setTitle } from '../utils/document-title.js';
interface PageTitleProps{
  location:KnownLocations;
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
  const {location } = props;
  const item = parseHtmlElement(template);
  const title = labels[location];
  ensureTitle(item,title);
  setTitle(title);
  return item;
};
