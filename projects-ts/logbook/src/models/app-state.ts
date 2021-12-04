import { EventManager } from '../utils/event-manager.js';
import { StateManager } from '../utils/state-manager.js';

export type KnownLocations = 'logbook' | 'pivot-table';
export type KnownListStates = 'ready' | 'stale';

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
type EventTypes = 'locationChanged'| 'dataChanged'| 'pivotChanged';

export type AppEvents<T> = Record<EventTypes, Pick<EventManager<AppProps<T>>,'subscribe'|'unsubscribe'>>

export type MethodFactoryArguments<T> = StateManager<AppProps<T>> & Pick<EventManager<AppProps<T>>,'fireEvent'>;


