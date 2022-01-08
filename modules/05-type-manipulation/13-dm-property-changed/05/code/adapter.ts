import { createEventManager } from "./event-manager";
import { Notify } from "./types";

const createReducer = <T>(buffer: T) => (proxy: Notify<T>, propertyName: keyof T) => {
  //каждый раз создаем новый менеджер события
  const manager = createEventManager<Notify<T>>();
  Object.defineProperty(proxy, propertyName, {
    // самой свойство обернем геттером и сеттером
    get: () => buffer[propertyName],
    // причем сеттере произведем уведомление
    set: (value) => {
      buffer[propertyName] = value;
      // Как избежать лишних сообщений об установке свойства
      // если его значение реально не поменялось? :)
      manager.dispatch(proxy, propertyName);
    }
  });
  // дополнительно для этого же свойства добавим 
  // read-only свойство- менеджер событий
  Object.defineProperty(proxy, `${propertyName}Changed`, {
    writable: false,
    value: manager.subscriptionManager
  });
  return proxy;
};

// Ограничим себя "простыми" плоскими объектами
type PlainRow = Record<string, number | boolean | string | null | undefined>;

// адаптер для создания обертки вокруг оригинального значения
// рассматривает каждый его ключ и добавляет в изначально пустой
// объект нужные свойства
export const wrapNotify = <T extends PlainRow>(buffer: T): Notify<T> => Object
  .keys(buffer)
  .reduce(
    createReducer(buffer),
    {} as Notify<T>,
  );