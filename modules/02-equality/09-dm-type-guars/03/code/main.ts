import { CustomStore, SettingProvider, Settings } from './store';

const createStorageInternal = (settings:Settings):CustomStore=>{throw new Error('not implemented yet')}

export const createStorage = (settings:SettingProvider):CustomStore=>createStorageInternal(
  typeof settings==='function'?settings():settings
)