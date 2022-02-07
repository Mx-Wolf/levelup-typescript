# Соберем функцию редуктором

Изготовим редуктор, задача которого, для указанного имени поля, находить в документе нужный элемент и присоединять к нему обработчик события. Такой редуктор можно изготовить с помощью [такой фабрики](https://codesandbox.io/s/step-4-demo-4-5-module-4-b5f4f?file=/src/reducer-creator.ts)

```ts
export const createReducer = (container: HTMLElement) => (
  unSubscribers: Unsubscribe[],
  [field, factory]: [string, ListenerFactory]
) => [
  ...unSubscribers,
  ...detectBindElement(container.querySelector(`[name=${field}]`), factory)
];
```

В файле [binder.ts](https://codesandbox.io/s/step-4-demo-4-5-module-4-b5f4f?file=/src/binder.ts:188-287) теперь мы можем воспользоваться наработками и использовать редуктор для выполнения нужной задачи

Мы вынесли создание редуктора и начального значения в отдельные модули для удобства изучения.
