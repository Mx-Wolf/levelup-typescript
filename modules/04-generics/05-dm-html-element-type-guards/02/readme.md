# Дискриминаторы

Перед вызовом `subscribe` из прошлого шага мы должны определить, является ли элемент одним из тех, которые мы обрабатываем.

Нам потребуется несколько функций — кастомных определителей типа. [Вот один из вариантов](https://codesandbox.io/s/step-2-demo-4-5-module-4-wxs2e?file=/src/type-guards.ts) определения такой функции:

```ts
export const isButton = (element: Element): element is HTMLButtonElement =>
  element.tagName === "BUTTON";
export const isInput = (element: Element): element is HTMLInputElement =>
  element.tagName === "INPUT";
export const isCheckBox = (element: HTMLInputElement): boolean =>
  element.type === "checkbox";
export const isSelect = (element: Element): element is HTMLSelectElement =>
  element.tagName === "SELECT";
export const isTextArea = (element: Element): element is HTMLTextAreaElement =>
  element.tagName === "TEXTAREA";
```

Вы можете посетовать, что типы HTML\*\*\*Element не образуют discriminating union по значению поля `tagName`. Возможно, это связано с тем, что множество тегов можно дополнять. Но как бы то ни было, это так, и нам приходится придумывать дискриминаторы.

Обратите внимание на то, что результат функции оформлен в виде утверждения: _argument_ **is** _type name_. Этот предикат типа и позволяет сервисам TypeScript делать нужные выводы. В остальном функция дискриминатора типа — обычная булевая функция.
