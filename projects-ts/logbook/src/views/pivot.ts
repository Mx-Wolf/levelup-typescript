import { createHtmlElement } from './parser.js';

export const createPivot = ()=>{
  const rv = createHtmlElement('div');
  rv.innerText = 'pivot goes here';
  return rv;
};
