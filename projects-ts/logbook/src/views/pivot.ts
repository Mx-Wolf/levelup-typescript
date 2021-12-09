import { PivotConfiguration } from '../models/app-state.js';
import { AppContext } from '../models/app.js';
import { RowData } from '../models/row-data.js';
import { MODAL_OPEN_CSS } from '../settings/const.js';
import { isPivotConfigured } from '../utils/pivot-configured-flag.js';
import { createPageTitle } from './page-title.js';
import { createHtmlFragment } from './parser.js';
import { createPivotItems } from './pivot-it.js';
import { createPivotNotConfigured } from './pivot-nc.js';
import { createPivotPopup } from './pivot-popup.js';

type PivotProps = Partial<PivotConfiguration<RowData>> & Pick<AppContext<RowData>,'setPivot'> & {
  rows:RowData[]
};

export const createPivot = (props:PivotProps)=>{
  const config:Partial<PivotConfiguration<RowData>> = props;
  const popup = createPivotPopup(props);
  const handleOpen = ()=>{
    popup.classList.add(MODAL_OPEN_CSS);
  };

  return createHtmlFragment([
    createPageTitle({location:'pivot-table'}),
    isPivotConfigured(config)?
      createPivotItems(
      /*config, props*/
        {onOpenClick:handleOpen, rows:props.rows, setPivot: props.setPivot,...config}
      ):
      createPivotNotConfigured({onOpenClick:handleOpen}),
    popup,]);
};
