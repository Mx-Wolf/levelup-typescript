# Структурная типизация — благо или помеха v2.0

Если компилятору не хватает пары полей, добавим их (смотрим [файл](https://codesandbox.io/s/step-2-demo-18-module-3-l9to0?file=/src/back-up-path.test.ts)). Однако это нас не спасает.

```terminal
Type '{ name: string; path: string; baseFolder: string; profileName: string; }' is not assignable to type 'SettingsManager'.
  Property 'profileName' is private in type 'SettingsManager' but not in type '{ name: string; path: string; baseFolder: string; profileName: string; }'.ts(2322)
```

Дело в том, что классы делают вклад в две Вселенные TypeScript одновременно. Они создают тип во Вселенной типов, но оставляют после себя значение во Вселенной значений.

Если типы не имеют отражения во время работы программы (читай в JavaScript), то значения — есть значения. Они доступны во время исполнения. В этом случае значения полей в JavaScript `profileName` и `baseFolder` — обычные значения.

Один из вариантов — разделить публичный интерфейс и реализацию класса.
