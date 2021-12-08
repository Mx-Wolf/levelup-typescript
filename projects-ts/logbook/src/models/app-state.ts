import { aggregateFunctions, groupingFunctions } from '../settings/grouping-functions.js';
import { EventManager } from '../utils/event-manager.js';
import { StateManager } from '../utils/state-manager.js';

export type KnownLocations = 'logbook' | 'pivot-table';
export type KnownListStates = 'ready' | 'stale';

export interface ColumnSettings<T>{
  columnId: number;
  size: 'small'|'middle'|'large';
  label: string;
  format: (row:T)=>string;
  orderBy?: (keyof T)|undefined;
}

export type Labeler<T,F> = [field:keyof T, functionName: keyof F];

export interface PivotConfiguration<T>{
  rowGroup: Labeler<T,typeof groupingFunctions>;
  columnGroup: Labeler<T,typeof groupingFunctions>;
  aggregator: Labeler<T,typeof aggregateFunctions>;
}

export interface AppProps<T> extends Partial<PivotConfiguration<T>>{
  columns: ColumnSettings<T>[];
  location: KnownLocations;
  rowsState: KnownListStates;
  rowCount: number;
  rows: T[];
  message: string | undefined;
}

export interface AppMethods<T> {
  setLocation(location: KnownLocations): void;
  requestRows(): void;
  setRows(rows: T[]): void;
  failRows(message: string): void;
  setPivot(settings: Required<Readonly<PivotConfiguration<T>>>): void;
}

type EventTypes = 'locationChanged'| 'dataChanged'| 'pivotChanged';

export type AppEvents<T> = Record<EventTypes, Pick<EventManager<AppProps<T>>,'subscribe'|'unsubscribe'>>

export type MethodFactoryArguments<T> = StateManager<AppProps<T>> & Pick<EventManager<AppProps<T>>,'fireEvent'>;

export type Procedure = ()=>void;
