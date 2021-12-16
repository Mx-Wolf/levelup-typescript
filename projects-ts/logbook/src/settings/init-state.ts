import { createMockRowData } from '../mock/rows.js';
import { AppProps } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { columns } from './columns.js';

export const initState :AppProps<RowData> = {
  columns,
  location: 'logbook',
  message: undefined,
  rowCount: 0,
  rows: createMockRowData(),
  rowsState: 'ready',
};
