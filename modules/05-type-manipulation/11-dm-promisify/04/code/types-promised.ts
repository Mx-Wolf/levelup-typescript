import {GameBoardView} from './types';

// Определим тип в котором для каждого ключа исходного типа
// GameBoardView переопределим его имя и тип.
// Используем Capitalize для придания эстетичного вида новым свойствам
export type GamePromised = {
  [K in keyof GameBoardView as `promise${Capitalize<K>}`]: Promise<void>;
}