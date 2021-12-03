export type KnownLocations = 'logbook' | 'pivot-table';
export interface AppState {
  readonly location: KnownLocations;
  changeLocation(location:KnownLocations):void;
}

