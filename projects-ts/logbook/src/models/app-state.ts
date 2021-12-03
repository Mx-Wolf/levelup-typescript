import { EventManager } from '../utils/event-manager.js';

export type KnownLocations = 'logbook' | 'pivot-table';
export type KnownListStates = 'ready' | 'stale';

export type JsonValue
  = boolean
  | number
  | string
  | null
  | Array<JsonValue>
  | { [k: string]: JsonValue }

export interface AppProps<T> {
  location: KnownLocations;
  rowsState: KnownListStates;
  rowCount: number;
  rows: T[];
  message: string | undefined;
  rowLabeler: string | undefined;
  columnLabeler: string | undefined;
  comparer: string | undefined;
}

export interface AppMethods<T> {
  setLocation(location: KnownLocations): void;
  requestRows(): void;
  setRows(rows: T[]): void;
  failRows(message: string): void;
  setPivot(settings: Required<Readonly<Pick<AppProps<T>, 'columnLabeler' | 'comparer' | 'rowLabeler'>>>): void;
}

export type AppEvents<T> = Record<
  'locationChanged'
  | 'dataChanged'
  | 'pivotChanged',
  Pick<EventManager<AppProps<T>>,'subscribe'|'unsubscribe'>>
export interface MethodFactoryArguments<T>{
  getState:()=>AppProps<T>;
  setState:(next:AppProps<T>)=>void;
  fireEvent:EventManager<AppProps<T>>['fireEvent'];
}


