import { Notify } from "./types";

// Пока не реализован.
const createReducer: any = null;

// Ограничим себя «простыми» плоскими объектами.
type PlainRow = Record<string, number | boolean | string | null | undefined>;

// Адаптер для создания обёртки вокруг оригинального значения
// рассматривает каждый его ключ и добавляет в изначально пустой
// объект нужные свойства.
export const wrapNotify = <T extends PlainRow>(buffer: T): Notify<T> => Object
  .keys(buffer)
  .reduce(
    createReducer(buffer),
    {} as Notify<T>,
  );
