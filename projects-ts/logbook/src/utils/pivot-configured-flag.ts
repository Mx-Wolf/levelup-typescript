import { PivotConfiguration } from '../models/app-state.js';
import { RowData } from '../models/row-data.js';

export const isPivotConfigured = (p:Partial<PivotConfiguration<RowData>>): p is Required<PivotConfiguration<RowData>> => {
  const {columnGroup: columnLabeler,aggregator: comparer,rowGroup: rowLabeler} = p;
  return typeof columnLabeler !== 'undefined'
  && typeof comparer !== 'undefined'
  && typeof rowLabeler !== 'undefined';
};
