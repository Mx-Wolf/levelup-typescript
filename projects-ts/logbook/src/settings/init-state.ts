import { createMockRowData } from '../mock/rows.js';
import { AppProps } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';
import { columns } from './columns.js';

export const initState :AppProps<RowData> = {
  columns,
  columnLabeler: 'key in functions catalog to show labels on top',
  comparer: 'key in functions catalog to compare rows for grouping',
  location: 'logbook',
  message: undefined,
  rowCount: 0,
  rowLabeler: 'key in function catalog to show labels on the left',
  rows: createMockRowData(),
  rowsState: 'ready',
};
