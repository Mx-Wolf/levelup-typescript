export type EventHandler<T> = (context: Readonly<T>) => void;
export interface EventManager<Context>{
  subscribe(handler: EventHandler<Context>):void;
  unsubscribe(handler: EventHandler<Context>):void;
  fireEvent(context:Context):void;
}
export const createEventManager= <Context>():EventManager<Context>=>{
  const subscribers = new Set<EventHandler<Context>> ();
  return {
    fireEvent:(context:Context)=>{[...subscribers].forEach((handler)=>handler(context));},
    subscribe:(handler: EventHandler<Context>)=>subscribers.add(handler),
    unsubscribe:(handler:EventHandler<Context>)=>subscribers.delete(handler),
  };
};
