import { PivotConfiguration } from '../models/app-state.js';
import { MODAL_OPEN_CSS } from '../settings/const.js';
import { isPivotConfigured } from '../utils/pivot-configured-flag.js';
import { createHtmlElement } from './parser.js';
import { createPivotNotConfigured } from './pivot-nc.js';
import { createPivotPopup } from './pivot-popup.js';

type PivotProps = Partial<PivotConfiguration>;

const createPivotItems = ()=>createHtmlElement('div',{'class':'main items-to-go'});

export const createPivot = (props:PivotProps)=>{
  const config:Partial<PivotConfiguration> = props;
  const popup = createPivotPopup();
  const handleOpen = ()=>{
    popup.classList.add(MODAL_OPEN_CSS);
  };
  const fra = document.createDocumentFragment();
  fra.append(
    isPivotConfigured(config)?createPivotItems(/*config, props*/):createPivotNotConfigured({onOpenClick:handleOpen}),
    popup,
  );
  return fra;
};
