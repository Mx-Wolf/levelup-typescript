import { createList, ListProps, SubList } from '../components/list/list.js';
import { MODAL_OPEN_CSS } from '../settings/const.js';
import { attach } from '../utils/attach-event.js';
import { compareStrings, formatString } from '../utils/string-comparer.js';
import { parseHtmlElement } from './parser.js';

const popupTemplate = `<div class="modal modal--pivot-settings">
<div class="modal__wrapper">
  <div class="modal__overlay"></div>
  <div class="modal__content">
    <div class="pivot-settins">
      <h2 class="title title--page">Настройки сводной таблицы</h2>
      <div class="pivot-settins__wrap">

      </div>
      <div class="pivot-settins__footer">
        <button data-pivot="cancel" class="button button--lighter">
          <span>Отменить</span>
        </button>
        <button data-pivot="apply" class="button button--fill">
          <span>Применить</span>
        </button>
      </div>
    </div>
    <button class="modal__close-btn btn-reset" type="button" aria-label="Закрыть попап">
      <svg width="15" height="15">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </div>
</div>
</div>`;

const stringItems = [
  'Марка',
  'Модель',
  'Водитель',
  'Тех-центр',
  'Вид обслуживания',
  'Сумма, ₽',
  'Пробег',
];

const functionNames = [
  'Максимум',
  'Среднее',
  'Соединить список',
  'Сумма',
];

const tree:SubList<string>[] = functionNames.map((functionName)=>({
  label:functionName,
  list: stringItems.map((field)=>`${field}-${functionName}`),
  subList:true
}));

const noop:()=>void = ()=>undefined;

const rowGroupingsListProps: ListProps<string> = {
  format: (value) => value,
  comparer: compareStrings,
  onChange:noop,
  reset: 'Сбросить выбор',
  label: 'Значения строк',
  list: stringItems,
  name: 'row-grouping',
  value: stringItems[2],
};
const columnGroupingsListProps: ListProps<string> = {
  format: (value) => value,
  comparer: compareStrings,
  onChange: noop,
  reset: 'Сбросить выбор',
  label: 'Значения колонок',
  list: stringItems,
  name: 'column-grouping',
  value: stringItems[2],
};
const aggregateListProps: ListProps<string> = {
  label:'Группирующая функция',
  list:tree,
  name: 'aggregate-function',
  reset: 'Сбросить выбор',
  value: '',
  comparer: compareStrings,
  format: formatString,
  onChange:noop,
};

const ensureLists = (container: HTMLElement | null) => {
  if (container === null) {
    return;
  }
  container.append(
    createList(rowGroupingsListProps),
    createList(columnGroupingsListProps),
    createList(aggregateListProps),
  );
};

export const createPivotPopup = () => {
  const item = parseHtmlElement(popupTemplate);

  ensureLists(item.querySelector('.pivot-settins__wrap'));

  const handleCancel = () => {
    item.classList.remove(MODAL_OPEN_CSS);
  };
  const handleApply = () => {
    handleCancel();
  };

  attach(
    'click',
    item.querySelector('.modal__close-btn'),
    handleCancel,
  );

  attach(
    'click',
    item.querySelector('[data-pivot="cancel"]'),
    handleCancel
  );

  attach(
    'click',
    item.querySelector('[data-pivot="apply"]'),
    handleApply,
  );

  return item;
};
