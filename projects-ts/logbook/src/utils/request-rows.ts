import { MethodFactoryArguments } from '../models/app-state.js';
import { mergeState } from './merge-state.js';

export const createRequestRows = <T>(
  {fireEvent,getState,setState}:MethodFactoryArguments<T>
) => async () => {
    const current = getState();
    if(current.rowsState === 'stale'){
      return;
    }
    const next = await mergeState(current, {rowsState:'stale', message: '' });
    setState(next);
    fireEvent(next);
  };
