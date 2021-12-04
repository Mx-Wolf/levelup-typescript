import { AppProps } from '../models/app-state.js';

export type StateManager<Context> = {
  getState:()=>Context,
  setState:(next:Context)=>void;
}

export const createStateManager=<T>(init:AppProps<T>):StateManager<AppProps<T>>=>{
  let state = init;
  const setState = (next: AppProps<T>) => { state = next; };
  const getState = ()=>state;
  return{
    getState,
    setState,
  };
};
