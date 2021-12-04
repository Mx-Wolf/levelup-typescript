import { KnownLocations } from '../models/app-state.js';
import { createNavItem } from './nav-item.js';
import { parseHtmlElement } from './parser.js';
import { labels } from '../settings/labels.js';

const template = `<nav class="main-nav">
<div class="main-nav__wrapper">
  <ul class="main-nav__list">    
  </ul>
</div>
</nav>`;


const arrayOfKeys = <T>(target: T) => Object.keys(target) as (keyof T)[];

interface MainNavProps {
  location: KnownLocations,
  setLocation: (next: KnownLocations) => void,
}

const ensureItems = (list: HTMLUListElement | null, props: MainNavProps) => {
  if (list === null) {
    return;
  }
  const { location, setLocation } = props;
  const createOnClick = (next: KnownLocations) => (evt: MouseEvent) => {
    evt.preventDefault();
    setLocation(next);
  };
  const getIsActive = (next: KnownLocations) => next === location;

  const items = arrayOfKeys(labels).map((label) => createNavItem({ active: getIsActive(label), label: labels[label], onClick: createOnClick(label) }));
  list.append(...items);

};

export const createMainNav = (props: MainNavProps) => {
  const item = parseHtmlElement(template);
  ensureItems(item.querySelector('ul.main-nav__list'), props);
  return item;
};
