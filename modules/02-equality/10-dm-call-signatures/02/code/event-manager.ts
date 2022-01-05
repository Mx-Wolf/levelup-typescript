import { Event } from "./types"
import { Callable } from "./callable";

export const createEventManager = <T>(): Event<T> & Callable<T> => {
  throw new Error('');
}