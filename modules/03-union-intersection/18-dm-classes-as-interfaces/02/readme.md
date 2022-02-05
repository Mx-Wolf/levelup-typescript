# Структурная типизация - благо или помеха v2.0

Раз компилятору не хватает пары полей, - добавим их (см. [файл](https://codesandbox.io/s/step-2-demo-18-module-3-l9to0?file=/src/back-up-path.test.ts)). Однако это нас не спасает.

```terminal
Type '{ name: string; path: string; baseFolder: string; profileName: string; }' is not assignable to type 'SettingsManager'.
  Property 'profileName' is private in type 'SettingsManager' but not in type '{ name: string; path: string; baseFolder: string; profileName: string; }'.ts(2322)
```

Дело в том, что классы делают вклад в две вселенные TypeScript одновременно. Они создают тип во вселенной типов, но они оставляют после себя значение во вселенной значений.

Если типы не имеют отражения во время работы программы (читай в JavaScript), то значения, - есть значения. Они доступны во время исполнения. В этом случае значения полей в JavaScript `profileName` и `baseFolder` это обычные значения.

Один из вариантов - разделить публичный интерфейс и реализацию класса.
