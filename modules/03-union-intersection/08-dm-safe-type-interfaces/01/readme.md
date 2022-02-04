# Об устойчивости интерфейса функции

При использовании TypeScript вы обозначаете типы аргументов функции. В результате ваш код становится зависимым от этих типов. Если развитие продукта потребует изменение типа, вам придется изменять исходный код вашей функции.

Изучите влияние изменения описания типа, предложите и реализуйте интерфейс функции, более устойчивой чем это сделано в данном коде

## Время T0

В начальный момент интерфейс содержит

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

Предложено создать функцию `createReport` с интерфейсом

```ts
type CustomerId = string;
type DateTime = string;
type LastOrderReportLine = Map<CustomerId, DateTime>;

interface Reporter {
  (orders: Order[]): LastOrderReportLine;
}
```

От этой функции требуется изучить список заказов `orders` и вернуть словарь где каждому клиенту сопоставляется дата последнего заказа.

Возможно, бизнес логика приложения использует сведения о долго спящих клиентах, чтобы предложить им плюшки.

Исходные сведения получаются из запроса в базу данных

```ts
declare const getOrders:()=>Order[];
```

## Время T1

Приложение претерпело развитие, и выяснилось, что база данных перестал хранить кличество позиций и сумму заказа в записи Order.

после модифицирования функции `getOrders` состояние таково

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

Можно, конечно, добавить запросы в базу данных и выяснить количество и сумму каждого заказа.

Но можно поступить по другому. Как? см. шаг 2.

сейчас вы можете изучить начальное состояние [в песочнице](https://codesandbox.io/s/step-1-demo-03-08-module-03-safty-to-function-interface-4qxlf)

#
#
