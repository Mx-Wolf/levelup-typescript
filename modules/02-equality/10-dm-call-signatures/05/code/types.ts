export interface EventHandler<T>{
  (context:T):void;
}
export type Unsubscribe = ()=>void;

export interface Event<T>{
  subscribe(handler:EventHandler<T>):Unsubscribe;
  unsubscribe(handler:EventHandler<T>):void;
}

export interface Model<T> {
  rows: T[];
  orderBy: string;
  update(row: T): void;
  rowsChanged: Event<Model<T>>;
  sortChanged: Event<Model<T>>;
}

export interface KeyedRecord {
  id:number;
  name: string;
  [fields:string]:unknown;
}
