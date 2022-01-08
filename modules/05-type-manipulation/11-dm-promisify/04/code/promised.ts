import { GamePromised } from "./types-promised";
import { createGameBoard } from './original';

// создадим адаптер, воспользуемся математикой
// работающей в оригинальной игре
// но вернем новый интерфейс
export const createPromised = (): GamePromised => {
  const original = createGameBoard();
  return {
    // редактор будет нам подсказывать новые имена для ключей. а в качестве функции 
    // обратного вызова используем resolve
    promiseNeutralizeEvil: new Promise<void>((resolve) => original.neutralizeEvil(resolve)),
    promiseEncourageMate: new Promise<void>((resolve) => original.encourageMate(resolve)),
    promiseDisarmDevice: new Promise<void>((resolve) => original.disarmDevice(resolve)),
  };
};
