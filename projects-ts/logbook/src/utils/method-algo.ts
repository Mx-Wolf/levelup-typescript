import { AppProps, MethodFactoryArguments } from '../models/app-state.js';
import { mergeState } from './merge-state.js';

interface Strategy<T,P> {
    equals:(getState: () => AppProps<T>, value: P)=> boolean;
    make:(value: P)=> Partial<AppProps<T>>;
}

export const methodAlgo = <T,P>({
  fireEvent,
  getState,
  setState,
  equals,
  make,
}: MethodFactoryArguments<T> &Strategy<T,P>) => async (p: P) => {
    if (equals(getState, p)) {
      return;
    }
    const next = await mergeState(getState(), make(p));
    setState(next);
    fireEvent(next);
  };
