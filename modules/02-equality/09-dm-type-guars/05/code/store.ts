import { CloudCredentials } from "./drivers/cloud-driver";
import { LocalSettings } from "./drivers/local-driver";

export type CustomStore = Storage; 
export type DriverType = 'memory'|'local'|'session'|'cloud';

interface CloudSettings extends CloudCredentials{
  type: 'cloud';
}
interface BrowserSettings extends LocalSettings{
  type: 'local'|'session';
}
interface MemorySettings {
  type: 'memory';
}

export type Settings = CloudSettings | BrowserSettings | MemorySettings;

export type SettingProvider = Settings | (()=>Settings);
