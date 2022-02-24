# Создание подписки на событие

Предположим, задача решена. Каким будет последнее действие нашей программы — функции привязки формы?

Очевидно, это будет добавление обработчика события к нужному элементу.

```ts
export const subscribe: SubscribeOverloads = (target, name, handler) => {
  target.addEventListener(name, handler as never);
  return ()=>target.removeEventListener(name, handler as never);
};
```

В этом отрывке даже без изучения определения интерфейса `SubscribeOverloads` можно увидеть, что:

- `target` — это элемент на странице; 
- `name` — имя события, которое следует обрабатывать;
-  `handler` — собственно обработчик.

Мы добавим определение интерфейса `SubscribeOverloads` для учёта перегруженных вариантов и поручим TypeScript контролировать вызов функции subscribe. Пусть TypeScript уведомит нас, если мы попытаемся использовать эту функцию в каких-то случаях, которые ещё не проверили.

Описание интерфейса будет таким:

```ts
interface SubscribeOverloads {
  (target: HTMLButtonElement, name: 'click', listener: ReturnType<ListenerFactory['makeButtonClick']>): Unsubscribe;
  (target: HTMLInputElement, name: 'click', listener: ReturnType<ListenerFactory['makeInputClick']>): Unsubscribe;
  (target: HTMLInputElement, name: 'input', listener: ReturnType<ListenerFactory['makeInputInput']>): Unsubscribe;
  (target: HTMLSelectElement, name: 'input', listener: ReturnType<ListenerFactory['makeSelectInput']>): Unsubscribe;
  (target: HTMLTextAreaElement, name: 'input', listener: ReturnType<ListenerFactory['makeTextAreaInput']>): Unsubscribe;
}
```

Вы можете найти этот фрагмент в файле [subscribe.ts](https://codesandbox.io/s/step-1-demo-4-5-module-4-enygv?file=/src/subscribe.ts). Мы будем использовать его на следующем этапе.
