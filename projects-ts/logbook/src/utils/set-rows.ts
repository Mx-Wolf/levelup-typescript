import { MethodFactoryArguments } from '../models/app-state.js';
import { mergeState } from './merge-state.js';

export const createSetRows = <T>({
  fireEvent,
  getState,
  setState,
}: MethodFactoryArguments<T>) => async (
    rows: T[],
  ) => {
    const current = getState();
    const next = await mergeState(current, { rows, message: '', rowCount: rows.length, rowsState: 'ready' });
    setState(next);
    fireEvent(next);
  };
