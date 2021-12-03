import { eventManager } from '../utils/event-manager.js';
import { createFailRows } from '../utils/fail-rows.js';
import { methodAlgo } from '../utils/method-algo.js';
import { createRequestRows } from '../utils/request-rows.js';
import { createSetLocation } from '../utils/set-location.js';
import { createSetPivot } from '../utils/set-pivot.js';
import { createSetRows } from '../utils/set-rows.js';
import { AppEvents, AppMethods, AppProps } from './app-state.js';


export const app = <T>(init: AppProps<T>): AppMethods<T> & AppEvents<T> => {
  let state = init;

  const dataChanged = eventManager<AppProps<T>>();
  const locationChanged = eventManager<AppProps<T>>();
  const pivotChanged = eventManager<AppProps<T>>();

  const setState = (next: AppProps<T>) => { state = next; };
  const getState = ()=>state;

  return {
    dataChanged,
    failRows: methodAlgo({getState, setState, fireEvent:dataChanged.fireEvent,...createFailRows}),
    locationChanged,
    pivotChanged,
    requestRows: methodAlgo<T,void>({getState, setState, fireEvent:dataChanged.fireEvent, ...createRequestRows}),
    setLocation: methodAlgo({getState, setState, fireEvent:locationChanged.fireEvent, ...createSetLocation}),
    setPivot: methodAlgo({getState, setState, fireEvent:pivotChanged.fireEvent,...createSetPivot}),
    setRows: methodAlgo<T,T[]>({getState,setState, fireEvent:dataChanged.fireEvent, ...createSetRows}),
  };
};
