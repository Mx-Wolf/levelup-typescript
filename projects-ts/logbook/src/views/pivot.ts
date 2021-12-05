import { PivotConfiguration } from '../models/app-state.js';
import { isPivotConfigured } from '../utils/pivot-configured-flag.js';
import { createHtmlElement } from './parser.js';
import { createPivotNotConfigured } from './pivot-nc.js';
import { createPivotPopup } from './pivot-popup.js';

type PivotProps = Partial<PivotConfiguration>;

const createPivotItems = ()=>createHtmlElement('div',{'class':'main items-to-go'});

export const createPivot = (props:PivotProps)=>{
  const config:Partial<PivotConfiguration> = props;
  const fra = document.createDocumentFragment();
  fra.append(
    isPivotConfigured(config)?createPivotItems(/*config, props*/):createPivotNotConfigured(),
    createPivotPopup(),
  );
  return fra;
};
