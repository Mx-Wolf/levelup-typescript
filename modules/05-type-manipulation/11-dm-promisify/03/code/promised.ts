import { GamePromised } from "./types-promised";
import {createGameBoard} from './original';

export const createPromised = (): GamePromised => {
  const original = createGameBoard();
  return {
    promiseNeutralizeEvil: new Promise<void>((resolve) => original.neutralizeEvil(resolve)),
    promiseEncourageMate: new Promise<void>((resolve) => original.encourageMate(resolve)),
    promiseDisarmDevice: new Promise<void>((resolve) => original.disarmDevice(resolve)),
  };
};
