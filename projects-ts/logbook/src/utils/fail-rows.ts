import { MethodFactoryArguments } from '../models/app-state.js';
import { mergeState } from './merge-state.js';

export const createFailRows = <T>(
  {fireEvent,getState,setState,}:MethodFactoryArguments<T>,
) => async (
    message: string,
  ) => {
    const current =  getState();
    if (current.message === message) {
      return current;
    }
    const next = await mergeState(current, { message });
    setState(next);
    fireEvent(next);
  };
