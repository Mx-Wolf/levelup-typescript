const parser = new DOMParser();
const isHtmlElement = (item: Element | null): item is HTMLElement => item !== null && 'accessKey' in item;

export const parseHtmlElement = (html: string): HTMLElement => {
  const rv = parser.parseFromString(html, 'text/html').body.firstElementChild;
  if (!isHtmlElement(rv)) {
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
