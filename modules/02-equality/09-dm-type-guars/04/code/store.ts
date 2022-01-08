import { CloudCredentials } from "./drivers/cloud-driver";
import { LocalSettings } from "./drivers/local-driver";

export type CustomStore = Storage; 
export type DriverType = 'memory'|'local'|'session'|'cloud';

//настройки для облачного хранилища
interface CloudSettings extends CloudCredentials{
  type: 'cloud';
}

//настройки для браузерного хранилища 
interface BrowserSettings extends LocalSettings{
  type: 'local'|'session';
}

//настройки для хранилища в памяти
interface MemorySettings {
  type: 'memory';
}

//объединение всех настроек - однозначно различается по полю type
export type Settings = CloudSettings | BrowserSettings | MemorySettings;

export type SettingProvider = Settings | (()=>Settings);
