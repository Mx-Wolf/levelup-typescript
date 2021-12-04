import { createHtmlElement } from './parser.js';

interface HeadCellProps{
  modifier: 'large'|'middle'|'small';
  label: string;
}

export const css = (modifier:HeadCellProps['modifier'])=>`table__cell table__cell--${modifier}`;

export const createTableHeadCell = (props:HeadCellProps)=>{
  const {label,modifier} = props;
  const item = createHtmlElement('th');
  item.className = css(modifier);
  item.innerText = label;
  return item;
};
