export type EventHandler<T> = (context: T) => void;
export class EventManager<Context>{

  private _subscribers: Set<EventHandler<Context>>;
  constructor() {
    this._subscribers = new Set<EventHandler<Context>>();
  }

  public subscribe(handler: EventHandler<Context>) {
    if (this._subscribers.has(handler)) {
      return;
    }
    this._subscribers.add(handler);
  }

  public unsubscribe(handler: EventHandler<Context>){
    this._subscribers.delete(handler);
  }

  public fireEvent(context:Context){
    [...this._subscribers].forEach((handler)=>handler(context));
  }
}
