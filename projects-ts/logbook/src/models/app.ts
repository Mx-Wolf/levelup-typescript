import { EventHandler, EventManager } from '../utils/event-manager.js';
import { getOrCreate } from '../utils/map-get.js';
import { AppState, KnownLocations } from './app-state.js';

const LOCATION_KEY = 'location';

export class App implements AppState {
  private _location: KnownLocations;
  private _managers: Map<string, EventManager<AppState>>;
  constructor() {
    this._location = 'logbook';
    this._managers = new Map<string, EventManager<AppState>>();
  }

  public setLocation(location: KnownLocations): void {
    if (this._location === location) {
      return;
    }
    this._location = location;
    this._notifyPropertyChanged(LOCATION_KEY);
  }

  public get location(): 'logbook' | 'pivot-table' {
    return this._location;
  }

  public attachLocationChange(handler: EventHandler<AppState>) {
    const manager = getOrCreate(this._managers, LOCATION_KEY, App.createManager);
    manager.subscribe(handler);
  }

  public removeLocationChange(handler: EventHandler<AppState>) {
    const manager = getOrCreate(this._managers, LOCATION_KEY, App.createManager);
    manager.unsubscribe(handler);
  }

  private static createManager() {
    return new EventManager<AppState>();
  }

  private _notifyPropertyChanged(name: string) {
    const manager = getOrCreate(this._managers, name, App.createManager);
    manager.fireEvent(this);
  }
}
