# Перегрузка функций

В TypeScript перегрузка функций декларируется в том числе с помощью сигнатуры вызова:

```ts
export interface ThemeMiddleware {
  (element: HTMLButtonElement): HTMLButtonElement;
  (element: HTMLImageElement): HTMLImageElement;
}
```

## Проблема переехала

Клиентский код — тот, что в модульном тесте — теперь «счастлив».

![Перегрузка функций в сигнатуре вызова помогает](../assets/2022-02-04Capture.PNG)

Однако мы получили [проблему реализации](https://codesandbox.io/s/step-2-demo-03-12-tv5ym?file=/src/theme-middleware.ts).

```terminal
Type '(element: HTMLButtonElement | HTMLImageElement) => HTMLButtonElement | HTMLImageElement' is not assignable to type 'ThemeMiddleware'.
  Type 'HTMLButtonElement | HTMLImageElement' is not assignable to type 'HTMLButtonElement'.
    Type 'HTMLImageElement' is missing the following properties from type 'HTMLButtonElement': disabled, form, formAction, formEnctype, and 12 more.ts(2322)
```

Как с ней поступить? Придётся применить силу.

С кодом этого шага можно ознакомиться [в песочнице](https://codesandbox.io/s/step-2-demo-03-12-tv5ym).
