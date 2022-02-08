# Реализация функции getControl

Для реализации функции `getControl` нам потребуется описание интерфейса. Дело в том, что мы хотим создать функцию, возвращающую различные типы в зависимости от значения аргумента.

```ts
interface ControlProvider {
  (type: "button"): Button;
  (type: "customer"): CustomerSelect;
  (type: "product"): ProductSelect;
}
```

Поскольку в JavaScript нет перегруженных функций, нам требуется это определение, чтобы объяснить компилятору наши намерения.

Теперь мы можем добавить [определение провайдера](https://codesandbox.io/s/step-3-demo-03-16-module-3-t5pbt?file=/src/control-provider.ts), опирающегося на настройки init.

```ts
const getControl: ControlProvider = (type) => {
  if (factory === null) {
    throw new Error("not initialized");
  }
  return factory[type]() as never;
};
```
