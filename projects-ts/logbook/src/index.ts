import { RowData } from './models/row-data.js';
import { createApp } from './models/app.js';
import { initState } from './settings/init-state.js';
import { createRender } from './startup/rendering.js';

const render = createRender(
  createApp<RowData>(initState),
  document.querySelector('div.wrapper'));

render();
