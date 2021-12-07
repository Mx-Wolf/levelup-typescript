import { PivotConfiguration } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { MODAL_OPEN_CSS } from '../settings/const.js';
import { isPivotConfigured } from '../utils/pivot-configured-flag.js';
import { createPageTitle } from './page-title.js';
import { createHtmlFragment } from './parser.js';
import { createPivotItems } from './pivot-it.js';
import { createPivotNotConfigured } from './pivot-nc.js';
import { createPivotPopup } from './pivot-popup.js';

type PivotProps = Partial<PivotConfiguration> & {
  rows:RowData[]
};

export const createPivot = (props:PivotProps)=>{
  const config:Partial<PivotConfiguration> = props;
  const popup = createPivotPopup();
  const handleOpen = ()=>{
    popup.classList.add(MODAL_OPEN_CSS);
  };
  return createHtmlFragment([
    createPageTitle({location:'pivot-table'}),
    isPivotConfigured(config)?
      createPivotItems(
      /*config, props*/
        {onOpenClick:handleOpen, rows:props.rows}
      ):
      createPivotNotConfigured({onOpenClick:handleOpen}),
    popup,]);
};
