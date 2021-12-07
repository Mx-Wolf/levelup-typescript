import { createToolbar } from '../components/tool-bar/tool-bar.js';
import { createHtmlElement } from './parser.js';
import { createPivotPopup } from './pivot-popup.js';

interface PivotItemProps{
  onOpenClick:()=>void;
}

export const createPivotItems = (props:PivotItemProps) => createHtmlElement('div', { 'class': 'main' }, [
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
  createPivotPopup()
]);
