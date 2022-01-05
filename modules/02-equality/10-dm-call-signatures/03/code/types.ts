export interface EventHandler<T>{
  (context:T):void;
}
export type Unsubscribe = ()=>void;

export interface Event<T>{
  subscribe(handler:EventHandler<T>):Unsubscribe;
  unsubscribe(handler:EventHandler<T>):void;
}

export interface Model<T> {
  rows: Record<string, T>[];
  orderBy: string;
  update(row: Record<string, T>): void;
  rowsChanged: Event<Model<T>>;
  sortChanged: Event<Model<T>>;
}