export type CustomStore = Storage; 
export type DriverType = 'memory'|'local'|'session'|'cloud';

export type Settings = {
  driver: DriverType;
  //настройки для облачного хранилища
  productId: string;
  subscription: string;
  //настройки для хранилища в браузере
  masterKey: string;
  persist: boolean;
}

export type SettingProvider = Settings | (()=>Settings);
