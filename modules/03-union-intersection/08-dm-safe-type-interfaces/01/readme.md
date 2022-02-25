# Об устойчивости интерфейса функции

При использовании TypeScript вы обозначаете типы аргументов функции, и в результате код становится зависимым от этих типов. Если развитие продукта потребует изменения типа, вам придётся изменять исходный код функции.

Изучите влияние изменения описания типа, предложите и реализуйте интерфейс более устойчивой функции, чем это сделано в данном коде.

## Время T0

В начальный момент интерфейс содержит:

```ts
interface Order {
  orderId: number;
  datePlaced: string;
  customerId: string;
  itemsCount: number;
  amountTotal: number;
  taxTotal: number;
  includeHandling: boolean;
  includeShipping: boolean;
}
```

Предложено создать функцию `createReport` с интерфейсом:

```ts
type CustomerId = string;
type DateTime = string;
type LastOrderReportLine = Map<CustomerId, DateTime>;

interface Reporter {
  (orders: Order[]): LastOrderReportLine;
}
```

От этой функции требуется изучить список заказов `orders` и вернуть словарь, где каждому клиенту сопоставляется дата последнего заказа.

Возможно, бизнес-логика приложения использует сведения о клиентах, которые давно ничего не заказывали, чтобы предложить им какие-то преимущества.

Исходные сведения получаются из запроса в базу данных:

```ts
declare const getOrders:()=>Order[];
```

## Время T1

Приложение претерпело развитие, и выяснилось, что база данных перестала хранить кличество позиций и сумму заказа в записи Order.

После изменения функции `getOrders` состояние стало:

```ts
interface Order2 {
  orderId: number;
  datePlaced: string;
  customerId: string;
  includeHandling: boolean;
  includeShipping: boolean;
}

declare const getOrders: () => Order2[];
```

При этом выяснилось, что `createReport` больше не компилируется.

Конечно, можно добавить запросы в базу данных и выяснить количество и сумму каждого заказа, но можно поступить иначе. Как? Посмотрим на втором шаге.

Сейчас вы можете изучить начальное состояние [в песочнице](https://codesandbox.io/s/step-1-demo-03-08-module-03-safty-to-function-interface-4qxlf).
