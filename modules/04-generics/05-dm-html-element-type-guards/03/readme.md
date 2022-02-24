# Использование дискриминаторов типа

Мы добавим функцию, которая будет проверять, является ли предъявленный элемент из страницы одним из обрабатываемых. Если это так, то функция будет подписывать нужный код на нужное событие.

Эта функция может [выглядеть так](https://codesandbox.io/s/step-3-demo-4-5-module-4-3lfli?file=/src/detect-bind-element.ts:245-876):

```ts
const attach = (target: Element, methods: ListenerFactory): Unsubscribe => {
  if (isButton(target)) {
    return subscribe(target, "click", methods.makeButtonClick());
  }
  if (isInput(target)) {
    if (isCheckBox(target)) {
      return subscribe(target, "click", methods.makeInputClick());
    }
    return subscribe(target, "input", methods.makeInputInput());
  }
  if (isSelect(target)) {
    return subscribe(target, "input", methods.makeSelectInput());
  }
  if (isTextArea(target)) {
    return subscribe(target, "input", methods.makeTextAreaInput());
  }
  throw new Error(`unexpected target type ${target.tagName}`);
};
```
