import { AppProps } from '../models/app-state.js';

export const createRequestRows = {
  equals: <T>(getState:()=>AppProps<T>) => getState().rowsState === 'stale',
  make: () => ({ rowsState: 'stale' as const, message: '' }),
};
