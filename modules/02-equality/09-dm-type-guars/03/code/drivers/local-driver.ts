import { CustomStore } from "../store";

export interface LocalSettings{
  masterKey: string;
  persist: boolean;
}
export const createLocalStore = (settings: LocalSettings):CustomStore=>{throw new Error();};
export const createSessionStore = (settings: LocalSettings):CustomStore=>{throw new Error();};