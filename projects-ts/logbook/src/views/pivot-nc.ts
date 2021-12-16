import { attach } from '../utils/attach-event.js';
import { createHtmlElement, parseHtmlElement } from './parser.js';

interface PivotNotConfiguredProps{
  onOpenClick: ()=>void;
}

const template = `<div class="container">
<div class="not-configured__wrap">
  <svg width="200" height="200">
    <use xlink:href="#icon-smile"></use>
  </svg>
  <h1 class="title title--page">Сводная таблица не настроена</h1>
  <p>Пожалуйста, выберите поля для группировки журнала</p>
  <button class="button button--fill" data-modal="pivot-settings">
    <svg width="24" height="24">
      <use xlink:href="#icon-settings"></use>
    </svg>
    <span>Настройки сводной таблицы</span>
  </button>
</div>
</div>`;

export const createPivotNotConfigured = (p:PivotNotConfiguredProps)=>{
  const {onOpenClick}  =p;
  const item = createHtmlElement(
    'main',
    {'class':'not-configured'},
    [
      parseHtmlElement(template),
    ]
  );

  attach(
    'click',
    item.querySelector('[data-modal="pivot-settings"]'),
    onOpenClick
  );

  return item;
};
