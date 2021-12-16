import { parseHtmlElement } from './parser.js';

interface NavLinkProps {
    active: boolean;
    label: string;
    onClick:(evt:MouseEvent)=>void;
}

const template = `<li class="main-nav__item">
<a href="#" class="link    ">
  <span>Журнал обслуживания</span>
</a>
</li>`;

const LINK_ACTIVE = 'link--active';

const ensureActive = (a: HTMLAnchorElement | null, active: boolean) => {
  if (!active || a === null) {
    return;
  }
  a.classList.add(LINK_ACTIVE);
};

const ensureLabel = (span: HTMLSpanElement | null, label: string) => {
  if (span === null) {
    return;
  }
  span.innerText = label;
};


export const createNavItem = (state: NavLinkProps) => {
  const { active, label, onClick } = state;
  const item = parseHtmlElement(template);

  ensureActive(item.querySelector('a'), active);
  ensureLabel(item.querySelector('span'), label);
  item.addEventListener('click',onClick);
  return item;
};
