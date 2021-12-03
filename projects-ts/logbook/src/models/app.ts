import { AppState, KnownLocations } from './app-state.js';

export class App implements AppState {
  private _location: KnownLocations;
  constructor() {
    this._location = 'logbook';
  }

  changeLocation(location: KnownLocations): void {
    if(this._location === location){
      return;
    }
    this._location = location;
    this._notifyPropertyChanged();
  }

  get location(): 'logbook' | 'pivot-table' {
    return this._location;
  }

  private _notifyPropertyChanged(){
    throw new Error('not implemented');
  }
}
