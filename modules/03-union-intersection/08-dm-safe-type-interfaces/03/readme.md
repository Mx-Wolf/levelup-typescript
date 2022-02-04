# Реализация свертки

Существует несколько вариантов написания функции сбора статистики по имеющимся требованиям. Мы остановились на свертке редуктором.

В этом случае нам потребуется два отрывка - создание начального состояния аккумулятора и, собственно, редуктор.

Начальное состояние см. файл `report-seed.ts`.

```ts
export const reportSeed = ()=>new Map<CustomerId,DateTime>();
```

функция редуктора проверяет, что предъявленный ей заказчик уже встречался и дату его прошлого заказа и при необходимости обновляет состояние. (cм. report-reducer.ts)

```ts
export const reportReducer = (
  report: Map<CustomerId, DateTime>,
  { customerId, datePlaced }: CustomerOrderDate,
): Map<string, string> => {
  if (isNewCustomerOrRecentDate(report.get(customerId), datePlaced)) {
    report.set(customerId, datePlaced);
  }
  return report;
};
```

Соединяя все вместе - получаем реализацию сбора статистики по клиента (см. `reporter.ts`)

```ts
export const createReport:Reporter = (orders) => orders.reduce(reportReducer, reportSeed());
```

код [в песочнице](https://codesandbox.io/s/step-3-demo-03-08-module-03-safty-to-function-interface-msh4n)

#
#
