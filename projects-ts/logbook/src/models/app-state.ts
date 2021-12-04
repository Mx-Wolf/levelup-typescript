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

export type DateValue = string & {'date-value':void};
export type VehicleMakeValue = string & {'vehicle-make-value':void};
export type VehicleModelValue = string & {'vehicle-model-value':void};
export type YearValue = number & {'year':void};
export type PersonNameValue = string & {'person-name':void};
export type ServiceStationValue = string & {'service-station':void};
export type PostalAddressValue = string & {'postal-address':void};

export interface Vehicle{
  id:number;
  make: VehicleMakeValue;
  model: VehicleModelValue;
  year: YearValue;
}

export interface Person{
  id:number;
  name: PersonNameValue;
}

export interface PostalAddress{
  POBox: string;
}

export interface ServiceStation{
  id:number;
  name: ServiceStationValue;
  address: PostalAddress;
}

export interface RowData{
  id:number;
  date: DateValue;
  vehicleId:number;
  vehicleMake: VehicleMakeValue;
  vehicleModel: VehicleModelValue;
  vehicleYear: YearValue;
  vehicleNumberPlate: string;
  driverName:PersonNameValue;
  serviceStationName: ServiceStationValue;
  serviceStationAddress: PostalAddressValue;
  serviceRendered: string;
}

export interface ColumnSettings<T>{
  columnId: number;
  size: 'small'|'middle'|'large';
  label: string;
  format: (row:T)=>string;
  orderBy?: (keyof T)|undefined;
}


