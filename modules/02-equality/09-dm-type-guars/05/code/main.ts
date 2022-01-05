import { createCloudStorage } from './drivers/cloud-driver';
import { createLocalStore, createSessionStore } from './drivers/local-driver';
import { createMemoryStore } from './drivers/memory-driver';
import { CustomStore, SettingProvider, Settings } from './store';

const createStorageInternal = (settings:Settings):CustomStore=>{
  const {type} = settings;
  switch(type){
    case 'cloud': return createCloudStorage(settings);
    case 'local': return createLocalStore(settings);
    case 'memory': return createMemoryStore();
    case 'session': return createSessionStore(settings);  
  }
}

export const createStorage = (settings:SettingProvider):CustomStore=>createStorageInternal(
  typeof settings==='function'?settings():settings
)

const mem = createStorage({type:'memory'});
const ses = createStorage({type:'session',masterKey:'my-app',persist:true});

let type = 'cloud';
const cloud = createStorage(()=>({type:toCloud(type), productId:'type-script-levelup',subscription:'html-academy'}));

const isCloud = (value: string): value is 'cloud' => value === 'cloud';
const toCloud = (value: string): 'cloud' =>{
  if(isCloud(value)){
    return value;
  }
  throw new RangeError(`invalid value for cloud driver ${value}`);
}