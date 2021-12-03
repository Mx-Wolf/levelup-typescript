import { AppProps } from '../models/app-state.js';

export const createSetPivot = {
  equals:<T>(
    getState:()=>AppProps<T>,
    { columnLabeler, comparer, rowLabeler }: Required<Readonly<Pick<AppProps<never>, 'columnLabeler' | 'comparer' | 'rowLabeler'>>>,
  )=>{
    const {
      columnLabeler: currentColumnLabeler,
      comparer: currentComparer,
      rowLabeler: currentRowLabeler,
    } = getState();
    return (columnLabeler === currentColumnLabeler
        && comparer === currentComparer
        && rowLabeler === currentRowLabeler);
  },
  make:(
    { columnLabeler, comparer, rowLabeler }: Required<Readonly<Pick<AppProps<never>, 'columnLabeler' | 'comparer' | 'rowLabeler'>>>,
  )=>({ columnLabeler, comparer, rowLabeler }),
};
