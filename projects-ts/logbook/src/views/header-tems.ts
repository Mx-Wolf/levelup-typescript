import { parseHtmlElement } from './parser.js';

const template = `<div class="header__terms">
<a href="#" class="link">
  <svg width="22" height="22">
    <use xlink:href="#icon-info"></use>
  </svg>
  <span>Условия использования</span>
</a>
</div>`;

export const createHeaderTerms = ()=> parseHtmlElement(template);
