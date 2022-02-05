# Разделяй и властвуй

Добавим определение публичного интерфейса `SettingsManager` в файл [i-face-settings-manager.ts](https://codesandbox.io/s/step-3-demo-18-module-3-h3k9o?file=/src/i-face-settings-manager.ts)

```ts
export interface SettingsManager {
  name: string;
  readonly path: string;
}
```

А реализацию самого класса обозначим [как специализацию](https://codesandbox.io/s/step-3-demo-18-module-3-h3k9o?file=/src/settings-manager.ts:95-155) этого интерфейса

```ts
export class SettingsManagerImp implements SettingsManager {
  private profileName: string = DEFAULT_PROFILE;

  constructor(private readonly baseFolder: string) {}

  get name() {
    return this.profileName;
  }
  set name(value: string) {
    this.profileName = value;
  }

  get path() {
    return `${this.baseFolder}/${this.profileName}`;
  }
}
```

После такого ремонта, наш код готов к модульному тестированию.

## Интерфейсы

Программирование с явным выделением описания (определения) интерфейсов очень полезная практика. Эта методика позволяет вам и вашим коллегам договариваться, заключать контракт, о порядке взаимодействия. TypeScript здесь на вашей стороне.
