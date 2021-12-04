import { parseHtmlElement } from './parser.js';

const template = `<div class="table">
</div>`;

export const createLogBook = ()=>{
  const item = parseHtmlElement(template);
  return item;
};
