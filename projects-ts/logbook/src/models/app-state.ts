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
  listState: KnownListStates;
  rowCount: number;
  rows: T[];
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
  EventManager<AppProps<T>>>
