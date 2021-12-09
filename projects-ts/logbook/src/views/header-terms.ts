import { CommandProps, createCommand } from '../components/tool-bar/tool-bar.js';
import { createHtmlElement } from './parser.js';

const settings:CommandProps={
  enabled:false,
  icon:'icon-info',
  label: 'Условия использования',
  className:'link'
};

export const createHeaderTerms = ()=> createHtmlElement(
  'div',
  {
    'class':'header__terms',
  },
  [
    createCommand(settings),
  ]
);

