export type Comparer<T> = (left: T, right: T) => number;
export type Formatter<T> = (value: T) => string;
export interface GroupingFunctionSettings<T> {
  createComparer: (field: keyof T) => Comparer<T>;
  createFormatter: (field: keyof T) => Formatter<T>;
  label: string;
}
export interface AggregateFunctionSettings<T> {
  createReducer: <R>(field:keyof T)=>(accumulator: R, item: T) => R;
  getInitialValue: <R>() => R;
  label: string;
}

export interface Index<T> {
  columnIndex:T[];
  columnOrder: number[];
  rowIndex: T[];
  rowOrder: number[];
  groups:  T[][][];
}
