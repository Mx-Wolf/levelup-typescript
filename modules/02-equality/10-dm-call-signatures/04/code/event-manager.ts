import { Event, EventHandler } from "./types"
import { Callable } from "./callable";

export const createEventManager = <T>(): Event<T> & Callable<T> => {
  const handlers = new Set<EventHandler<T>>();
  const unsubscribe = (handler:EventHandler<T>)=>handlers.delete(handler);
  return Object.assign(
    (context:T)=>handlers.forEach((handler)=>handler(context)),
    {
      subscribe:(handler:EventHandler<T>)=>{
        handlers.add(handler);
        return ()=>unsubscribe(handler);
      },
      unsubscribe,
    }
  );
}