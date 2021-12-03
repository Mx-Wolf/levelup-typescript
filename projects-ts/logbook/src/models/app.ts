import { AppState, KnownLocations } from './app-state.js';

export class App implements AppState {
  private _location: KnownLocations;
  constructor() {
    this._location = 'logbook';
  }

  get location(): 'logbook' | 'pivot-table' {
    return this._location;
  }

}
