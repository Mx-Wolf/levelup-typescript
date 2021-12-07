import { createToolbar } from '../components/tool-bar/tool-bar.js';
import { RowData } from '../models/row-data.js';
import { createHtmlElement } from './parser.js';
import { createPivotFrame } from './pivot-frame.js';
import { createPivotPopup } from './pivot-popup.js';

interface PivotItemProps{
  onOpenClick:()=>void;
  rows:RowData[]
}

export const createPivotItems = (props:PivotItemProps) => createHtmlElement('div', { 'class': 'main' }, [
  createHtmlElement('div',{'class':'container'},[
    createToolbar({
      commands:[
        {
          className:'linkmain__setting-link',
          icon:'icon-settings',
          label:'Настройки сводной таблицы',
          onClick:props.onOpenClick,
          enabled:true,
        },
      ]},
    ),
    createPivotFrame(props),
  ]),
  createPivotPopup()
]);
