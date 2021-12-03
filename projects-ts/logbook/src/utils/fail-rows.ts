import { AppProps } from '../models/app-state.js';

export const createFailRows = {
  equals: <T>(getState:()=>AppProps<T>, p: string) => getState().message === p,
  make: (message:string) => ({ message}),
};
