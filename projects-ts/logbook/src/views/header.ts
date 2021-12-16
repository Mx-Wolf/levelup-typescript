import { AppProps, AppMethods } from '../models/app-state.js';
import { createHeaderTerms } from './header-terms.js';
import { createMainNav } from './main-nav.js';
import { parseHtmlElement } from './parser.js';

type HeaderProps = Pick<AppProps<unknown>,'location'>&Pick<AppMethods<unknown>,'setLocation'>;

const template = `<header class="header ">
<div class="container header__wrapper">  
</div>
</header>`;

const ensureHeader = (div:HTMLDivElement|null, props:HeaderProps)=>{
  if(div===null){
    return;
  }
  div.append(
    createMainNav(props),
    createHeaderTerms(),
  );
};

export const createHeader = (props:HeaderProps)=>{
  const container = parseHtmlElement(template);
  ensureHeader(container.querySelector('div.container'), props);
  return container;
};
