import { AppProps } from '../models/app-state.js';

export const createStateManager=<T>(init:AppProps<T>)=>{
  let state = init;
  const setState = (next: AppProps<T>) => { state = next; };
  const getState = ()=>state;
  return{
    getState,
    setState,
  };
};
