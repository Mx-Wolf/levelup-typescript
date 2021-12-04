import { parseHtmlElement } from './parser.js';

const template = `<main class="main">
</main>`;

const ensureContent =(item:HTMLElement)=>undefined;

export const createMain = ()=>{
  const item = parseHtmlElement(template);
  ensureContent(item);
  return item;
};
