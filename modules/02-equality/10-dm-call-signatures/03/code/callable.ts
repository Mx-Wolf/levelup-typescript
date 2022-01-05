export interface Callable<T>{
  (context:T):void;
}