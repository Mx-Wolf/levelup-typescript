import { createList, ListProps, SubList } from '../components/list/list.js';
import { AppMethods, PivotConfiguration } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { MODAL_OPEN_CSS } from '../settings/const.js';
import { aggregateFunctions, groupingFunctions } from '../settings/grouping-functions.js';
import { fieldLabels } from '../settings/labels.js';
import { attach } from '../utils/attach-event.js';
import { compareStrings } from '../utils/string-comparer.js';
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

const groupChoices = (Object.keys(groupingFunctions) as (keyof typeof groupingFunctions)[])
  .map((functionName) => (<SubList<[keyof RowData, keyof typeof groupingFunctions]>>{
    label: groupingFunctions[functionName].label,
    list: (Object.keys(fieldLabels) as (keyof RowData)[]).map((field) => ([field, functionName] as const)),
    subList: true,
  }));
const aggregateChoices = (Object.keys(aggregateFunctions) as (keyof typeof aggregateFunctions)[])
  .map((functionName) => (<SubList<[keyof RowData, keyof typeof aggregateFunctions]>>{
    label: aggregateFunctions[functionName].label,
    list: (Object.keys(fieldLabels) as (keyof RowData)[]).map((field) => ([field, functionName] as const)),
    subList: true
  }));

const noop: () => void = () => undefined;
const getFieldLabel = ([field]: [keyof RowData, string]) => fieldLabels[field];
const compareFieldGroup = (
  [fieldLeft, functionNameLeft]: [string, string],
  [fieldRight, functionNameRight]: [string, string],
) => {
  const r1 = compareStrings(fieldLeft, fieldRight);
  return r1 !== 0 ? r1 : compareStrings(functionNameLeft, functionNameRight);
};

const rowGroupingsListProps: ListProps<[keyof RowData, keyof typeof groupingFunctions]> = {
  format: getFieldLabel,
  comparer: compareFieldGroup,
  onChange: noop,
  reset: 'Сбросить выбор',
  label: 'Значения строк',
  list: groupChoices,
  name: 'row-grouping',
  value: groupChoices[0].list[0],
};
const columnGroupingsListProps: ListProps<[keyof RowData, keyof typeof groupingFunctions]> = {
  format: getFieldLabel,
  comparer: compareFieldGroup,
  onChange: noop,
  reset: 'Сбросить выбор',
  label: 'Значения колонок',
  list: groupChoices,
  name: 'column-grouping',
  value: groupChoices[0].list[0],
};
const aggregateListProps: ListProps<[keyof RowData, keyof typeof aggregateFunctions]> = {
  label: 'Группирующая функция',
  list: aggregateChoices,
  name: 'aggregate-function',
  reset: 'Сбросить выбор',
  value: aggregateChoices[0].list[0],
  comparer: compareFieldGroup,
  format: getFieldLabel,
  onChange: noop,
};
interface SetFieldHere {
  (key: Extract<keyof PivotConfiguration<RowData>, 'rowGroup'>, value: [field: keyof RowData, functionName: keyof typeof groupingFunctions]): void;
  (key: Extract<keyof PivotConfiguration<RowData>, 'columnGroup'>, value: [field: keyof RowData, functionName: keyof typeof groupingFunctions]): void;
  (key: Extract<keyof PivotConfiguration<RowData>, 'aggregator'>, value: [field: keyof RowData, functionName: keyof typeof aggregateFunctions]): void;

}
const ensureLists = (container: HTMLElement | null, setField: SetFieldHere) => {
  if (container === null) {
    return;
  }
  container.append(
    createList({ ...rowGroupingsListProps, onChange: (value) => setField('rowGroup', value) }),
    createList({ ...columnGroupingsListProps, onChange: (value) => setField('columnGroup', value) }),
    createList({ ...aggregateListProps, onChange: (value) => setField('aggregator', value) }),
  );
};

const collectSelection = (popupState: Partial<PivotConfiguration<RowData>>): popupState is PivotConfiguration<RowData> => {
  const { aggregator, columnGroup, rowGroup } = popupState;
  return Array.isArray(aggregator) && aggregator.length === 2
    && Array.isArray(columnGroup) && columnGroup.length === 2
    && Array.isArray(rowGroup) && rowGroup.length === 2;
};

type PivotPopupPorps = Pick<AppMethods<RowData>, 'setPivot'>;


export const createPivotPopup = (props: PivotPopupPorps) => {
  const { setPivot } = props;
  const item = parseHtmlElement(popupTemplate);
  const popupState = {} as Partial<PivotConfiguration<RowData>>;

  ensureLists(item.querySelector('.pivot-settins__wrap'), (key: keyof PivotConfiguration<RowData>, value) => { popupState[key as 'aggregator'] = value as typeof popupState['aggregator']; });

  const handleCancel = () => {
    item.classList.remove(MODAL_OPEN_CSS);
  };
  const handleApply = () => {
    if (collectSelection(popupState)) {
      setPivot(popupState);
      handleCancel();
    }
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
