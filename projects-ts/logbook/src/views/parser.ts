const parser = new DOMParser();
const isHtmlElement = (item: Element | null): item is HTMLElement => item !== null && 'accessKey' in item;
const isSvgElement = (item: Element | null): item is SVGElement => item !== null && 'viewportElement' in item;

export const parseHtmlElement = (html: string): HTMLElement => {
  const rv = parser.parseFromString(html, 'text/html').body.firstElementChild;
  if (!isHtmlElement(rv)) {
    throw new Error(`not a decently rooted html [${html}]`);
  }
  return rv;
};

export const  parseSvgElement = (html:string):SVGElement=>{
  const rv = parser.parseFromString(html, 'text/html').body.firstElementChild;
  if (!isSvgElement(rv)) {
    throw new Error(`not a decently rooted html [${html}]`);
  }
  return rv;
};

const setAttributes = (item: HTMLElement, attributes: Record<string, string>): HTMLElement => Object.keys(attributes).reduce((a, b) => {
  a.setAttribute(b, attributes[b]);
  return a;
}, item);

const setChildren = (
  item: HTMLElement,
  children: Node[],
) => {
  item.append(...children);
  return item;
};

const ensureAttributes = (
  item: HTMLElement,
  attributes: Record<string, string> | undefined,
) => typeof attributes === 'undefined' ? item : setAttributes(item, attributes);

const ensureChildren = (
  item: HTMLElement,
  children?: Node[] | undefined
) => Array.isArray(children) ? setChildren(item, children) : item;

export const createHtmlElement = (
  tag: keyof HTMLElementTagNameMap,
  attributes?: Record<string, string> | undefined,
  children?: Node[] | undefined,
): HTMLElement => ensureChildren(ensureAttributes(document.createElement(tag), attributes), children);

export const createHtmlFragment = (
  children:Node[]
)=>{
  const result = document.createDocumentFragment();
  result.append(...children);
  return result;
};

interface RefSvgProps{
  href:string;
  width: number;
  height: number;
}

export const createSvgRef = (props: RefSvgProps)=> {
  const result = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  result.setAttribute('width', `${props.width}`);
  result.setAttribute('height',`${props.height}`);
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href',props.href);
  result.appendChild(use);
  return result;
};

export const createText = (value:string)=> document.createTextNode(value);
