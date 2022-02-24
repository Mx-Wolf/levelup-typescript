# О пересечении типов

Система типов TypeScript разрешает присваивать переменной, объявленной с аннотацией типа `A | B`, значение, имеющее тип `A`.

Обозначим минимально необходимый набор полей из выборки о заказах как тип `A`, набор остальных полей обозначим типом `B`. Мы получим:

```ts
type A = {
  datePlaced: string;
  customerId: string;
}
type B = {
  orderId: number;
  itemsCount: number;
  amountTotal: number;
  taxTotal: number;
  includeHandling: boolean;
  includeShipping: boolean;
}
```

В таком виде тип `Order` эквивалентен типу `A|B`. Если мы сейчас подчеркнём, что для составления отчёта форма типа `B` совсем не важна, то приблизимся к цели. Во всяком случае, мы поняли, что тип функции `reporter` следует изменить:

```ts
type CustomerId = string;
type DateTime = string;
type LastOrderReportLine = Map<CustomerId, DateTime>;

interface A{
  datePlaced: string;
  customerId: string;
}

interface Reporter {
  (orders: A[]): LastOrderReportLine;
}
```

Конечно, именование типов одной буквой сложно назвать лучшей практикой, поэтому в песочнице мы применим имя `CustomerOrderDate`.

Изучите код [в песочнице](https://codesandbox.io/s/step-2-demo-03-08-module-03-safty-to-function-interface-bjn38).

Обратите внимание на изменения в файле `i-face-reporter.ts`.

Нам осталось реализовать эту функцию и испытать её.

