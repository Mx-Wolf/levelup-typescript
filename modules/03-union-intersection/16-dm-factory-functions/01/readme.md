# Фабрика UI-компонентов

Интерфейс фабрики может быть описан [таким образом](https://codesandbox.io/s/step-1-demo-03-16-module-3-z3u7b?file=/src/i-face-factory.ts).

```ts
interface UiFactory {
  button: () => Button;
  customer: () => CustomerSelect;
  product: () => ProductSelect;
}
```

Предлагаем вам изучить два следующих отрывка. Они демонстрируют идею создания абстрактной фабрики в TypeScript.

[Обратите внимание](https://codesandbox.io/s/step-1-demo-03-16-module-3-z3u7b?file=/src/factory.ts) на сокращённую запись `private buttonCtor: new () => Button,`. Ключевое слово **private** предлагает компилятору одновременно с описанием параметра конструктора создать приватное поле класса. Обозначение типа **new ()=>Button** требует от компилятора проверить, что в качестве параметра передаётся не просто функция, а именно класс.

```ts
export class Factory implements UiFactory {
  constructor(
    private buttonCtor: new () => Button,
    private customerCtor: new () => CustomerSelect,
    private productCtor: new () => ProductSelect
  ) {}

  button = () => new this.buttonCtor();
  customer = () => new this.customerCtor();
  product = () => new this.productCtor();
}
```

Поскольку у нас уже есть «реализации» HTML-контролов, мы можем создать [конкретную фабрику](https://codesandbox.io/s/step-1-demo-03-16-module-3-z3u7b?file=/src/html/factory.ts).

В случае TypeScript мы создаём экземпляр фабрики, оснащённый нужными конструкторами.
