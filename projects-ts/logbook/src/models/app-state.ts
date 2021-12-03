import { EventHandler } from '../utils/event-manager.js';

export type KnownLocations = 'logbook' | 'pivot-table';
export interface AppState {
  location: KnownLocations;
}
export interface AppMethods{
  changeLocation(location:KnownLocations):void;

}
export type Events<T> = {
  [K in keyof T as `attach${Capitalize<K & string>}Change`]:(handler:EventHandler<T>)=>void
} & {
  [K in keyof T as `remove${Capitalize<K & string>}Change`]:(handler:EventHandler<T>)=>void
}

