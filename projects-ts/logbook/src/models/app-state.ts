import { EventHandler } from '../utils/event-manager.js';

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args:never[])=>unknown ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type KnownLocations = 'logbook' | 'pivot-table';

export interface AppState {
  location: KnownLocations;
  changeLocation(location: KnownLocations): void;
}

export type Events<T> = {
  [K in keyof NonFunctionProperties<T> as `attach${Capitalize<K & string>}Change`]: (handler: EventHandler<T>) => void
} & {
    [K in keyof NonFunctionProperties<T> as `remove${Capitalize<K & string>}Change`]: (handler: EventHandler<T>) => void
  }

