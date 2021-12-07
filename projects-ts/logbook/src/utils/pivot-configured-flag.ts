import { PivotConfiguration } from '../models/app-state';

export const isPivotConfigured = (p:Partial<PivotConfiguration>): p is Required<PivotConfiguration> => {
  const {columnGroup: columnLabeler,aggregator: comparer,rowGroup: rowLabeler} = p;
  return typeof columnLabeler !== 'undefined'
  && typeof comparer !== 'undefined'
  && typeof rowLabeler !== 'undefined';
};
