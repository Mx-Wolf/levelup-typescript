import { attach } from '../../utils/attach-event.js';
import { createHtmlElement, createText, parseHtmlElement } from '../../views/parser.js';

export interface ListProps<T> {
  label: string;
  reset: string;
  name: string;
  value: T;
  onChange?: ((value: T) => void) | undefined;
  comparer?: ((a: T, b: T) => number) | undefined;
  format?: ((a: T) => string) | undefined;
  list: T[];
}

const resetTemplate = `<button class="form-filter__reset" type="reset">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="m12 10.59 4.95-4.95 1.41 1.41L13.41 12l4.95 4.95-1.41 1.41L12 13.41l-4.95 4.95-1.41-1.41L10.59 12 5.64 7.05l1.41-1.41L12 10.59Z" />
</svg>
<span></span>
</button>`;

const createListLabel = (label: string) => createHtmlElement(
  'h3',
  {
    'class': 'form-filter__title',
  },
  [
    createText(label)
  ]
);

const setResetLabel = (span: HTMLElement | null, label: string) => {
  if (span === null) {
    return;
  }
  span.innerText = label;
};

const createReset = (label: string) => {
  const result = parseHtmlElement(resetTemplate);
  setResetLabel(result.querySelector('span'), label);
  return result;
};

const ensureOnChange = <T>(element: HTMLElement, item: T, { onChange }: Pick<ListProps<T>, 'onChange'>): HTMLElement => {
  if (typeof onChange === 'function') {
    attach('click', element, () => onChange(item));
  }
  return element;
};

const ensureChecked = <T>(element: HTMLElement, item: T, props: Pick<ListProps<T>, 'comparer' | 'value'>) => {
  const { value, comparer } = props;
  (element as HTMLInputElement).checked = (typeof comparer === 'function' && comparer(item, value) === 0);
  return element;
};

const createListItemRadio = <T>(
  item: T,
  props: Pick<ListProps<T>, 'comparer' | 'name' | 'value'>,
) => ensureChecked(createHtmlElement(
    'input',
    {
      'type': 'radio',
      'name': `${props.name}-item`,
    }
  ),
  item,
  props);
const formatItem = <T>(item: T, props: Pick<ListProps<T>, 'format'>) => {
  const { format } = props;
  return typeof format === 'function' ? format(item) : `${item}`;
};
const createListItemText = <T>(
  item: T,
  props: Pick<ListProps<T>, 'format'>,
) => createHtmlElement(
    'span',
    {},
    [
      createText(formatItem(item, props))
    ]
  );

const createListItemLabel = <T>(
  item: T,
  props: Pick<ListProps<T>, 'comparer' | 'format' | 'name' | 'onChange' | 'value'>,
) => createHtmlElement(
    'label',
    {},
    [
      createListItemRadio(item, props),
      createListItemText(item, props)
    ]
  );

const createListItem = <T>(item: T, props: Pick<ListProps<T>, 'comparer' | 'format' | 'name' | 'onChange' | 'value'>) => {

  const element =
    createHtmlElement(
      'li',
      { 'class': 'form-filter__item' },
      [
        createListItemLabel(item, props)
      ]
    );
  return ensureOnChange(element, item, props);
};

const createListElement = <T>(props: Pick<ListProps<T>, 'comparer' | 'format' | 'list' | 'onChange' | 'value' | 'name'>): HTMLElement => createHtmlElement(
  'ul',
  { 'class': 'form-filter__list' },
  props.list.map((item) => createListItem(item, props))
);

export const createList = <T>(props: ListProps<T>): HTMLElement => {
  const { label, reset, name } = props;
  return createHtmlElement(
    'form',
    {
      'class': 'form-filter',
      'action': '/',
      'name': name
    },
    [
      createListLabel(label),
      createReset(reset),
      createListElement(props),
    ]
  );
};
