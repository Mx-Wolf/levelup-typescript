const parser = new DOMParser();
const isHtmlElement = (item:Element |null):item is HTMLElement=>item !== null && 'accessKey' in item;

export const parseHtmlElement = (html:string):HTMLElement=>{
  const rv =   parser.parseFromString(html,'text/html').body.firstElementChild;
  if(!isHtmlElement(rv)){
    throw new Error(`not a decently rooted html [${html}]`);
  }
  return rv;
};

export const createHtmlElement = (tag: keyof HTMLElementTagNameMap):HTMLElement=>document.createElement(tag);
