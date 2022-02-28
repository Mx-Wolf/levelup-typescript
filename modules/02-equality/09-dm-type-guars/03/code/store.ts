export type CustomStore = Storage;
export type DriverType = 'memory'|'local'|'session'|'cloud';

export type Settings = {
  driver: DriverType;
  //Настройки для облачного хранилища.
  productId: string;
  subscription: string;
  //Настройки для хранилища в браузере.
  masterKey: string;
  persist: boolean;
}

export type SettingProvider = Settings | (()=>Settings);
