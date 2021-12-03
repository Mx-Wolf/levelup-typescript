import { EventHandler } from '../utils/event-manager.js';

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: never[]) => unknown ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type KnownLocations = 'logbook' | 'pivot-table';
export type KnownListStates = 'ready' | 'stale';
export type PivotLabels<T> = Record<string, (row: T) => string>;
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

export type Setters<T> = {
  [K in keyof T as `set${Capitalize<K & string>}`]: (value: T[K]) => void;
}
export type Events<T> = {
  [K in keyof NonFunctionProperties<T> as `attach${Capitalize<K & string>}Change`]: (handler: EventHandler<T>) => void
} & {
    [K in keyof NonFunctionProperties<T> as `remove${Capitalize<K & string>}Change`]: (handler: EventHandler<T>) => void
  }

export type AppState<T> = Readonly<AppProps<T>> & Setters<Pick<AppProps<T>,'location'|'columnLabeler'|'comparer'|'rowLabeler'>> & Events<AppProps>


