import { EventManager } from '../utils/event-manager.js';
import { createFailRows } from '../utils/fail-rows.js';
import { createRequestRows } from '../utils/request-rows.js';
import { createSetLocation } from '../utils/set-location.js';
import { createSetPivot } from '../utils/set-pivot.js';
import { createSetRows } from '../utils/set-rows.js';
import { AppEvents, AppMethods, AppProps } from './app-state.js';


export const app = <T>(init: AppProps<T>): AppMethods<T> & AppEvents<T> => {
  let state = init;

  const dataChanged = new EventManager<AppProps<T>>();
  const locationChanged = new EventManager<AppProps<T>>();
  const pivotChanged = new EventManager<AppProps<T>>();

  const setState = (next: AppProps<T>) => { state = next; };
  const getState = ()=>state;

  return {
    dataChanged,
    failRows: createFailRows({getState, setState, eventManager:dataChanged}),
    locationChanged,
    pivotChanged,
    requestRows: createRequestRows({getState, setState, eventManager:dataChanged}),
    setLocation: createSetLocation({getState, setState, eventManager:locationChanged}),
    setPivot: createSetPivot({getState, setState,eventManager:pivotChanged}),
    setRows: createSetRows({getState,setState, eventManager:dataChanged}),
  };
};
