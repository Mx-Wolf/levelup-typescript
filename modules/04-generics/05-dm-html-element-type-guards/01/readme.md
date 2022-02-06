# Дискриминатор

Предположим, задача решена. Какое самое последнее действие будет выполнять наша программа, функция инициализации?

Очевидно, это будет добавление обработчика события к нужному элементу.

```ts
export const subscribe: SubscribeOverloads = (target, name, handler) => {
  target.addEventListener(name, handler as never);
  return ()=>target.removeEventListener(name, handler as never);
};
```

В этом отрывке, даже без изучения определения интерфейса `SubscribeOverloads` можно усмотреть, что `target` это элемент на странице, `name` это имя события, которое следует обрабатывать, а `handler` это собственно обработчик.

Мы добавим определение интерфейса `SubscribeOverloads` для учета перегруженных вариантов, и поручим TypeScript контролировать вызов функции subscribe. Пусть TypeScript уведомит нас, если мы попытаемся использовать эту функцию в каких-то случаях, которые мы еще не проверили.

тогда описание интерфейса будет

```ts
interface SubscribeOverloads {
  (target: HTMLButtonElement, name: 'click', listener: ReturnType<ListenerFactory['makeButtonClick']>): Unsubscribe;
  (target: HTMLInputElement, name: 'click', listener: ReturnType<ListenerFactory['makeInputClick']>): Unsubscribe;
  (target: HTMLInputElement, name: 'input', listener: ReturnType<ListenerFactory['makeInputInput']>): Unsubscribe;
  (target: HTMLSelectElement, name: 'input', listener: ReturnType<ListenerFactory['makeSelectInput']>): Unsubscribe;
  (target: HTMLTextAreaElement, name: 'input', listener: ReturnType<ListenerFactory['makeTextAreaInput']>): Unsubscribe;
}
```

В файле [subscribe.ts](https://codesandbox.io/s/step-1-demo-4-5-module-4-enygv?file=/src/subscribe.ts) вы можете найти этот отрывок. Мы будем использовать его на следующем этапе.
