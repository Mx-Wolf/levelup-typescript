import { CustomStore } from './store';

type Settings = unknown

type SettingProvider = Settings | (()=>Settings);

const createStorageInternal = (settings:Settings):CustomStore=>{throw new Error('not implemented yet')}

export const createStorage = (settings:SettingProvider):CustomStore=>createStorageInternal(
  typeof settings==='function'?settings():settings
)