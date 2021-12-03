import { AppProps, MethodFactoryArguments } from '../models/app-state.js';
import { mergeState } from './merge-state.js';

export const createSetPivot = <T>({ eventManager, getState, setState }: MethodFactoryArguments<T>) => async (
  { columnLabeler, comparer, rowLabeler }: Required<Readonly<Pick<AppProps<T>, 'columnLabeler' | 'comparer' | 'rowLabeler'>>>
) => {
  const current = getState();
  const {
    columnLabeler: currentColumnLabeler,
    comparer: currentComparer,
    rowLabeler: currentRowLabeler,
  } = current;
  if (columnLabeler === currentColumnLabeler
    && comparer === currentComparer
    && rowLabeler === currentRowLabeler) {
    return;
  }
  const next = await mergeState(current, { columnLabeler, comparer, rowLabeler });
  setState(next);
  eventManager.fireEvent(next);
};
