import { AppProps } from '../models/app-state.js';

export   const mergeState = async <T>(current: AppProps<T>, update: Partial<AppProps<T>>) => new Promise<AppProps<T>>((resolve) => {
  setTimeout(() => {
    if(current===update){
      return resolve(current);
    }
    return resolve({ ...current, ...update });
  }, 0);
});
