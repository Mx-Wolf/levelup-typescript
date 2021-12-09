import { MethodFactoryArguments, PivotConfiguration } from '../models/app-state.js';
import { mergeState } from './merge-state.js';

export const createSetPivot = <T>({ fireEvent, getState, setState }: MethodFactoryArguments<T>) => async (
  { columnGroup: columnLabeler, aggregator: comparer, rowGroup: rowLabeler }: Required<Readonly<PivotConfiguration<T>>>
) => {
  const current = getState();
  const {
    columnGroup: currentColumnLabeler,
    aggregator: currentComparer,
    rowGroup: currentRowLabeler,
  } = current;
  if (columnLabeler === currentColumnLabeler
    && comparer === currentComparer
    && rowLabeler === currentRowLabeler) {
    return;
  }
  const next = await mergeState(current, { columnGroup: columnLabeler, aggregator: comparer, rowGroup: rowLabeler });
  setState(next);
  fireEvent(next);
};
