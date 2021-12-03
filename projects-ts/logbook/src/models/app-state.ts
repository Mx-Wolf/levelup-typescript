
export interface AppState {
  readonly location: 'logbook' | 'pivot-table'
}
export type KnownLocations = AppState['location'];
