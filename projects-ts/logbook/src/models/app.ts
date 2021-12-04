import { EventManager, createEventManager } from '../utils/event-manager.js';
import { createFailRows } from '../utils/fail-rows.js';
import { createRequestRows } from '../utils/request-rows.js';
import { createSetLocation } from '../utils/set-location.js';
import { createSetPivot } from '../utils/set-pivot.js';
import { createSetRows } from '../utils/set-rows.js';
import { createStateManager, StateManager } from '../utils/state-manager.js';
import { AppEvents, AppMethods, AppProps } from './app-state.js';

export type AppContext<T> = AppMethods<T> & AppEvents<T> & Pick<StateManager<AppProps<T>>,'getState'>;

export const createApp = <T>(init: AppProps<T>): AppContext<T> => {
  const {getState,setState} = createStateManager(init);

  const dataChanged = createEventManager<AppProps<T>>();
  const locationChanged = createEventManager<AppProps<T>>();
  const pivotChanged = createEventManager<AppProps<T>>();

  const makeArgs = ({fireEvent}:Pick<EventManager<AppProps<T>>,'fireEvent'>)=>({
    getState,
    setState,
    fireEvent,
  });

  return {
    dataChanged,
    failRows: createFailRows(makeArgs(dataChanged)),
    locationChanged,
    pivotChanged,
    requestRows: createRequestRows(makeArgs(dataChanged)),
    setLocation: createSetLocation(makeArgs(locationChanged)),
    setPivot: createSetPivot(makeArgs(pivotChanged)),
    setRows: createSetRows(makeArgs(dataChanged)),
    getState,
  };
};
